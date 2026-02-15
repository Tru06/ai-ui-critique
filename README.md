# AI UI Critique Assistant

A modern Next.js application that provides AI-powered feedback on UI/UX designs from uploaded screenshots using Anthropic's Claude.

## Features

- 📸 Drag-and-drop image upload with preview
- 🤖 AI-powered design critique using Claude 3.5 Sonnet
- 🎨 Structured feedback on UX, accessibility, colors, layout
- ⚡ Built with Next.js 15 and TypeScript
- 💅 Modern UI with TailwindCSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
cp .env.example .env.local
```

3. Add your Anthropic API key to `.env.local`:
```
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from: https://console.anthropic.com/

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## API Response Structure

The `/api/analyze` endpoint returns structured JSON:

```json
{
  "overall_score": 8,
  "ux_issues": ["List of UX problems"],
  "accessibility_issues": ["Accessibility concerns"],
  "color_feedback": ["Color scheme observations"],
  "layout_feedback": ["Layout and spacing comments"],
  "suggestions": ["Actionable improvements"]
}
```

## Tech Stack

- Next.js 15
- TypeScript
- TailwindCSS
- Anthropic Claude API
- React 19
