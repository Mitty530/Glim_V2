import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path for waitlist data
const WAITLIST_FILE_PATH = path.join(process.cwd(), 'data', 'waitlist.json');

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would verify admin authentication here
    // This is just a simple implementation for demonstration
    
    // Check if the waitlist data file exists
    if (!fs.existsSync(WAITLIST_FILE_PATH)) {
      return NextResponse.json(
        { 
          totalSignups: 0,
          entries: []
        },
        { status: 200 }
      );
    }
    
    // Read waitlist data from file
    const rawData = fs.readFileSync(WAITLIST_FILE_PATH, 'utf8');
    const data = JSON.parse(rawData);
    
    if (!data.entries) {
      return NextResponse.json(
        { 
          totalSignups: 0,
          entries: []
        },
        { status: 200 }
      );
    }
    
    // Transform entries object to array and sort by position
    const entries = Object.values(data.entries)
      .sort((a: any, b: any) => a.waitlistPosition - b.waitlistPosition)
      .map((entry: any) => ({
        firstName: entry.firstName,
        email: entry.email,
        waitlistPosition: entry.waitlistPosition,
        createdAt: entry.createdAt,
        comments: entry.comments
      }));
    
    return NextResponse.json(
      { 
        totalSignups: data.count || 0,
        entries
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching waitlist data:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch waitlist data' },
      { status: 500 }
    );
  }
} 