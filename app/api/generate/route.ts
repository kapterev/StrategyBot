import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

if (!process.env.OPENROUTER_API_KEY || !process.env.OPENROUTER_BASE_URL || !process.env.OPENROUTER_MODEL || !process.env.APP_URL) {
  throw new Error('Required environment variables are not set');
}

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.APP_URL,
    "X-Title": "AI Text Processor"
  }
});

export async function POST(req: NextRequest) {
  try {
    const { inputText, prompt } = await req.json();

    if (!inputText || !prompt) {
      return NextResponse.json(
        { error: 'Input text and prompt are required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL as string,
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: inputText
        }
      ]
    });

    const generatedText = completion.choices[0].message.content;

    return NextResponse.json({ result: generatedText });
  } catch (error) {
    console.error('Error details:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate text' },
      { status: 500 }
    );
  }
}
