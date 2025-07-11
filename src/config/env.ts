export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    assistantId: process.env.ASSISTANT_ID || 'asst_XL1dp4NstLPyRzITCUf9nQE1',
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Group 3 Chatbot',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  }
}

export default config 