import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import config from '@/config/env'

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
})

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!config.openai.apiKey) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Parse request body
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Create a thread
    const thread = await openai.beta.threads.create()

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: config.openai.assistantId,
    })

    // Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    
    while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    if (runStatus.status === 'failed') {
      console.error('Assistant run failed:', runStatus.last_error)
      return NextResponse.json(
        { success: false, error: 'Assistant run failed' },
        { status: 500 }
      )
    }

    if (runStatus.status !== 'completed') {
      console.error('Assistant run did not complete:', runStatus.status)
      return NextResponse.json(
        { success: false, error: 'Assistant did not complete the request' },
        { status: 500 }
      )
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id)
    const assistantMessage = messages.data.find(
      msg => msg.role === 'assistant' && msg.run_id === run.id
    )

    if (!assistantMessage) {
      return NextResponse.json(
        { success: false, error: 'No response from assistant' },
        { status: 500 }
      )
    }

    // Extract the text content
    const textContent = assistantMessage.content.find(
      content => content.type === 'text'
    )

    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json(
        { success: false, error: 'Invalid response format from assistant' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: textContent.text.value,
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
} 