import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <header className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-6 py-5 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🤖</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Group 3 Chatbot</h1>
              <p className="text-gray-600 text-sm mt-0.5">Powered by OpenAI Assistant</p>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 max-w-4xl mx-auto w-full">
        <ChatInterface />
      </div>
    </main>
  )
} 