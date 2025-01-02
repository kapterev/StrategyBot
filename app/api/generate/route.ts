import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { inputText, prompt } = await req.json();

    if (!inputText || !prompt) {
      return NextResponse.json(
        { error: 'Input text and prompt are required' },
        { status: 400 }
      );
    }

    // Check environment variables
    const apiKey = process.env.OPENROUTER_API_KEY;
    const baseURL = process.env.OPENROUTER_BASE_URL;
    const model = process.env.OPENROUTER_MODEL;
    const appURL = process.env.APP_URL;

    if (!apiKey || !baseURL || !model || !appURL) {
      console.error('Missing environment variables:', {
        hasApiKey: !!apiKey,
        hasBaseURL: !!baseURL,
        hasModel: !!model,
        hasAppURL: !!appURL
      });
      return NextResponse.json(
        { error: 'API configuration is incomplete' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      baseURL,
      apiKey,
      defaultHeaders: {
        "HTTP-Referer": appURL,
        "X-Title": "AI Text Processor"
      }
    });

    const completion = await openai.chat.completions.create({
      model: model as string,
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
