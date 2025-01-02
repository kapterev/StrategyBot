# AI Text Processor Application

## Overview
This is a Next.js application that provides an interface for processing text using OpenRouter's API with Google's Gemini model. The application allows users to input text, customize an AI prompt, and receive AI-generated output.

## Project Structure

```
ai-text-processor/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # API endpoint for OpenRouter integration
│   ├── layout.tsx            # Root layout with toast notifications
│   ├── page.tsx              # Main application page
│   └── globals.css           # Global styles and Tailwind directives
├── components/
│   └── ui/                   # Reusable UI components
│       ├── button.tsx        # Button component
│       ├── card.tsx          # Card components for layout
│       ├── textarea.tsx      # Textarea component
│       ├── toast.tsx         # Toast notification component
│       ├── toaster.tsx       # Toast rendering component
│       └── use-toast.ts      # Toast hook and context
├── lib/
│   └── utils.ts              # Utility functions for styling
├── .env.local                # Environment variables (OpenRouter API key)
└── tailwind.config.ts        # Tailwind CSS configuration
```

## Key Components

### Main Page (app/page.tsx)
The main application interface consists of three main sections:
1. Input Text Box: For user text input
2. AI Prompt Box: For customizing the AI processing instructions
3. Output Box: For displaying the AI-generated result

### API Integration (app/api/generate/route.ts)
- Handles communication with OpenRouter's API using Google's Gemini model
- Uses OpenAI SDK with OpenRouter configuration
- Processes requests through a secure server-side route
- Manages error handling and response formatting

### UI Components
- **Button**: Customizable button component with variants
- **Card**: Container component for structured content
- **Textarea**: Text input component for user input
- **Toast**: Notification system for user feedback

## Features

### Text Processing
- Large text input support
- Customizable AI prompts
- Default prompt template
- Real-time processing status

### User Interface
- Responsive design
- Dark/light mode support
- Loading states
- Error handling
- Success notifications

### Functionality
1. **Text Input**
   - Multi-line text input
   - No content length restrictions
   - Clear placeholder text

2. **Prompt Customization**
   - Editable AI instructions
   - Reset to default option
   - Persistent prompt state

3. **Output Handling**
   - Copy to clipboard functionality
   - Clear output display
   - Error state handling

## Environment Setup

The application requires the following environment variables set in `.env.local` for local development, and in your deployment platform (e.g., Vercel) for production:
```
OPENROUTER_API_KEY=your-api-key-here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=google/gemini-2.0-flash-thinking-exp:free
APP_URL=http://localhost:3001  # Change to your production URL in deployment
```

Note: The application will gracefully handle missing environment variables and provide appropriate error messages rather than failing at build time.

## Styling
- Uses Tailwind CSS for styling
- Custom CSS variables for theming
- Responsive design principles
- Accessibility considerations

## State Management
- Uses React's useState for local state
- Context for toast notifications
- No external state management library required

## Error Handling
- Input validation
- API error handling
- User-friendly error messages
- Network error recovery

## Getting Started
1. Install dependencies: `npm install`
2. Set up environment variables
3. Run development server: `npm run dev`
4. Access at `http://localhost:3001`

## Technical Notes
- Built with Next.js 13+ (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui components
- OpenRouter API integration with Google's Gemini model
