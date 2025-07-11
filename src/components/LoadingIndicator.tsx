'use client'

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col max-w-xs lg:max-w-md">
        <div className="message-bubble bot-message">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-gray-500 text-sm">Assistant is typing...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator 