import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'API is working',
    timestamp: new Date().toISOString(),
    anthropic_key_configured: !!process.env.ANTHROPIC_API_KEY
  });
}