import fs from 'fs';
import path from 'path';
import mustache from 'mustache';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SendGrid API key not found. Email sending will not work.');
}

interface WaitlistEmailData {
  firstName: string;
  email: string;
  unsubscribeToken: string;
  comments?: string;
}

/**
 * Renders the waitlist confirmation email content by replacing template variables
 * with the provided data
 */
export function renderWaitlistEmail(data: WaitlistEmailData): { html: string; text: string } {
  // Get paths to email templates
  const htmlTemplatePath = path.join(process.cwd(), 'src/emails/waitlist-confirmation.html');
  const textTemplatePath = path.join(process.cwd(), 'src/emails/waitlist-confirmation.txt');
  
  // Read template files
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf-8');
  const textTemplate = fs.readFileSync(textTemplatePath, 'utf-8');
  
  // Render templates with data
  const html = mustache.render(htmlTemplate, data);
  const text = mustache.render(textTemplate, data);
  
  return { html, text };
}

/**
 * Sends a waitlist confirmation email to the user using SendGrid
 */
export async function sendWaitlistConfirmationEmail(data: WaitlistEmailData): Promise<boolean> {
  try {
    // Render the email content
    const { html, text } = renderWaitlistEmail(data);
    
    // Log email for development purposes
    console.log('===== WAITLIST EMAIL =====');
    console.log(`To: ${data.email}`);
    console.log(`Subject: Welcome to the Glim Waitlist!`);
    console.log('Text Content:', text.substring(0, 100) + '...');
    console.log(`From: ${process.env.SENDGRID_FROM_EMAIL || 'hello@glim.app'}`);
    console.log('==========================');
    
    // Check if we're in development mode or missing API key
    if (!process.env.SENDGRID_API_KEY) {
      console.error('No SendGrid API key found. Email will not be sent.');
      return false;
    }
    
    // Send email via SendGrid
    const msg = {
      to: data.email,
      from: process.env.SENDGRID_FROM_EMAIL || 'hello@glim.app',
      subject: 'Welcome to the Glim Waitlist!',
      text,
      html,
      trackingSettings: {
        clickTracking: {
          enable: true
        },
        openTracking: {
          enable: true
        }
      }
    };
    
    try {
      const response = await sgMail.send(msg);
      console.log(`Waitlist email sent successfully to ${data.email}. Status code: ${response[0]?.statusCode}`);
      return true;
    } catch (sendError: any) {
      console.error('SendGrid error details:', sendError);
      
      if (sendError.response) {
        console.error('SendGrid error response:', sendError.response.body);
      }
      
      return false;
    }
  } catch (error) {
    console.error('Failed to send waitlist email:', error);
    return false;
  }
}

/**
 * Generates a unique referral code for a user
 */
export function generateReferralCode(email: string): string {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `REF-${randomPart}`;
}

/**
 * Generates a unique unsubscribe token for a user
 */
export function generateUnsubscribeToken(email: string): string {
  return Buffer.from(`${email}-${Date.now()}`).toString('base64');
} 