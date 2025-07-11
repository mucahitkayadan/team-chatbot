'use client'

import { useState, useEffect, useRef } from 'react'
import { Message, ChatState } from '@/types'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import LoadingIndicator from './LoadingIndicator'

const ChatInterface = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatState.messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: Date.now()
    }

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          role: 'assistant',
          timestamp: Date.now()
        }

        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isLoading: false
        }))
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }))
    }
  }

  const clearError = () => {
    setChatState(prev => ({ ...prev, error: null }))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
        {chatState.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full px-4">
            <div className="welcome-card text-center">
              <div className="text-6xl mb-6">🤖</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome to Group 3 Chatbot!
              </h2>
              <p className="text-gray-600 mb-6">
                I'm powered by OpenAI Assistant and ready to help you with any questions you have.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                  Ask questions
                </span>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                  Get help
                </span>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                  Have a conversation
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {chatState.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {chatState.isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Display */}
      {chatState.error && (
        <div className="mx-6 mb-4 p-4 error-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-red-500 mr-3 text-lg">⚠️</span>
              <span className="text-red-800 text-sm font-medium">{chatState.error}</span>
            </div>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 ml-2 p-1 rounded-full hover:bg-red-200 transition-colors duration-200"
              aria-label="Close error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="border-t border-gray-200 bg-white p-6">
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={chatState.isLoading}
        />
      </div>
    </div>
  )
}

export default ChatInterface 