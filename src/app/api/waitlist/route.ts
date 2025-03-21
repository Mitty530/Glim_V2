import { NextRequest, NextResponse } from 'next/server';
import { generateUnsubscribeToken, sendWaitlistConfirmationEmail } from '@/lib/email';
import fs from 'fs';
import path from 'path';

// Define the path for storing waitlist data
const WAITLIST_DATA_PATH = path.join(process.cwd(), 'data');
const WAITLIST_FILE_PATH = path.join(WAITLIST_DATA_PATH, 'waitlist.json');

// Simple in-memory waitlist (also backed up to a JSON file)
let waitlistCount = 0;
const waitlistEntries: Record<string, WaitlistEntry> = {};

// Load existing waitlist data if available
try {
  if (!fs.existsSync(WAITLIST_DATA_PATH)) {
    fs.mkdirSync(WAITLIST_DATA_PATH, { recursive: true });
  }
  
  if (fs.existsSync(WAITLIST_FILE_PATH)) {
    const data = JSON.parse(fs.readFileSync(WAITLIST_FILE_PATH, 'utf8'));
    if (data.entries && data.count) {
      Object.assign(waitlistEntries, data.entries);
      waitlistCount = data.count;
    }
  }
} catch (error) {
  console.error('Error loading waitlist data:', error);
}

// Function to save waitlist data to file
const saveWaitlistData = () => {
  try {
    const data = {
      count: waitlistCount,
      entries: waitlistEntries,
      lastUpdated: new Date().toISOString()
    };
    
    if (!fs.existsSync(WAITLIST_DATA_PATH)) {
      fs.mkdirSync(WAITLIST_DATA_PATH, { recursive: true });
    }
    
    fs.writeFileSync(WAITLIST_FILE_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving waitlist data:', error);
    return false;
  }
};

interface WaitlistEntry {
  firstName: string;
  email: string;
  createdAt: Date;
  unsubscribeToken: string;
  waitlistPosition: number;
  comments?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const email = body.email.toLowerCase().trim();
    
    // Check if email is already in waitlist
    if (waitlistEntries[email]) {
      return NextResponse.json(
        { 
          message: 'You are already on our waitlist!',
          success: true
        },
        { status: 200 }
      );
    }
    
    // Increment waitlist count
    waitlistCount++;
    
    // Generate unsubscribe token
    const unsubscribeToken = generateUnsubscribeToken(email);
    
    // Create the waitlist entry
    const entry: WaitlistEntry = {
      firstName: body.firstName || 'Glim User',
      email,
      createdAt: new Date(),
      unsubscribeToken,
      waitlistPosition: waitlistCount,
      comments: body.comments || ''
    };
    
    // Store the entry
    waitlistEntries[email] = entry;
    
    // Save to file
    saveWaitlistData();
    
    // Send confirmation email
    const emailSent = await sendWaitlistConfirmationEmail({
      firstName: entry.firstName,
      email: entry.email,
      unsubscribeToken: entry.unsubscribeToken,
      comments: entry.comments
    });
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Successfully joined the waitlist!',
        success: true,
        emailSent: emailSent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Simple stats about the waitlist (for demonstration purposes)
  return NextResponse.json(
    { 
      totalSignups: waitlistCount,
      // In a real app, you would not expose the full list of emails
      recentSignups: Object.values(waitlistEntries)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(entry => ({
          firstName: entry.firstName,
          signupDate: entry.createdAt
        }))
    },
    { status: 200 }
  );
} 