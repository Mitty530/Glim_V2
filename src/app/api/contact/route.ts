import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { name, relationship_focus, email, message } = await request.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Insert data into Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_form')
      .insert([
        {
          name,
          relationship_focus,
          email,
          message,
        },
      ])
      .select()

    if (error) {
      console.error('Error saving contact form:', error)
      return NextResponse.json(
        { error: 'Failed to save your message' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been sent!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
} 