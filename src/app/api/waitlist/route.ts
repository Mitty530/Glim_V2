import { NextRequest, NextResponse } from 'next/server';
import { generateUnsubscribeToken, sendWaitlistConfirmationEmail } from '@/lib/email';
import { saveWaitlistEntry, getWaitlistCount } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

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
  name: string;
  email: string;
  createdAt: Date;
  unsubscribeToken: string;
  waitlistPosition: number;
  features?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Log debugging info
    console.log('Request body:', body);
    console.log('Environment variables:', {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    });
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    const email = body.email.toLowerCase().trim();
    const name = body.name.trim();
    const features = body.features || '';
    
    console.log('Processing waitlist submission for:', email);
    
    // Insert directly into waiting_list table
    try {
      console.log('Attempting Supabase insert');
      const { data, error } = await supabase
        .from('waiting_list')
        .insert([{
          name,
          email,
          features
        }])
        .select();
        
      console.log('Supabase result:', { data, error });
      
      if (error) {
        console.error('Error saving to Supabase:', error);
        return NextResponse.json(
          { 
            error: 'Failed to save your information. Please try again.',
            details: error.message
          },
          { status: 500 }
        );
      }
      
      // Return success response
      return NextResponse.json(
        { 
          message: 'Successfully joined the waitlist!',
          success: true,
          data
        },
        { status: 200 }
      );
    } catch (insertErr) {
      console.error('Exception during Supabase insert:', insertErr);
      return NextResponse.json(
        { 
          error: 'An unexpected error occurred while saving your information.',
          details: insertErr instanceof Error ? insertErr.message : String(insertErr)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process your request',
        details: error instanceof Error ? error.message : String(error)
      },
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
          name: entry.name,
          signupDate: entry.createdAt
        }))
    },
    { status: 200 }
  );
} 