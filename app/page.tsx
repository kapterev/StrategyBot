'use client'

import React, { useState } from 'react'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../components/ui/use-toast'
import { Loader2, Copy, RotateCcw } from 'lucide-react'

const DEFAULT_PROMPT = "Write me a 2000-symbol intro for a LinkedIn page"

export default function TextProcessor() {
  const [inputText, setInputText] = useState('')
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to process."
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText, prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setOutput(data.result)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process text. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    toast({
      title: "Copied!",
      description: "Output copied to clipboard"
    })
  }

  const handleReset = () => {
    setPrompt(DEFAULT_PROMPT)
    toast({
      title: "Reset Complete",
      description: "Prompt has been reset to default"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-4xl py-10 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Brand Strategy Bot</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Transform your text with the power of artificial intelligence
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Enter the text you want to process</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your text here..."
              className="min-h-[150px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>AI Prompt</CardTitle>
              <CardDescription>Customize how the AI should process your text</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <Button 
          className="w-full py-6 text-lg"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Generate Output'
          )}
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Generated Output</CardTitle>
                <CardDescription>AI-processed result</CardDescription>
              </div>
              {output && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[200px] p-4 rounded-lg bg-muted">
              {output || 'Output will appear here...'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
