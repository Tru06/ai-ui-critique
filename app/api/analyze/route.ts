import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'This endpoint accepts POST requests with image uploads for AI analysis',
    methods: ['POST'],
    status: 'working'
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Analyze API called');
    
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      console.error('No image provided in request');
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    console.log('Image received:', { type: image.type, size: image.size });

    // Return a mock response for now to test the flow
    const mockResponse = {
      overall_score: 8,
      ux_issues: [
        "Consider improving the visual hierarchy with better typography scaling",
        "Call-to-action buttons could be more prominent"
      ],
      accessibility_issues: [
        "Ensure color contrast meets WCAG 2.1 AA standards (4.5:1 ratio)",
        "Add focus indicators for keyboard navigation"
      ],
      color_feedback: [
        "Color palette appears cohesive and professional",
        "Consider using a more vibrant accent color for important actions"
      ],
      layout_feedback: [
        "Layout follows a clear grid system",
        "Spacing could be more consistent throughout the design"
      ],
      suggestions: [
        "Implement a design system for consistency across components",
        "Add micro-interactions to improve user engagement",
        "Consider mobile-first responsive design principles"
      ]
    };

    console.log('Returning mock response');
    return NextResponse.json(mockResponse);

  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    );
  }
}