# Group 3 Chatbot

A modern, responsive chatbot interface built with Next.js and integrated with OpenAI Assistant API.

## Features

- 🤖 Integration with OpenAI Assistant API
- 💬 Real-time chat interface
- 📱 Responsive design for all devices
- ⚡ Fast performance with Next.js
- 🎨 Modern UI with Tailwind CSS
- 🚀 Deployable to Vercel and localhost

## Setup Instructions

### Prerequisites

- Node.js 18+ installed

### OpenAI Assistant and API Key Setup

Before running the application, you need to set up an OpenAI Assistant. This involves creating the assistant, configuring it with a system prompt, attaching a vector store with resume files, and obtaining an API key.

1.  **Sign up or Log in to OpenAI**
    *   Navigate to [OpenAI Platform](https://platform.openai.com/).

2.  **Create an Assistant**
    *   Go to the [Assistants page](https://platform.openai.com/assistants).
    *   Click **+ Create**.
    *   **Name**: Choose a descriptive name (e.g., "Group 3 IWU Assistant").
    *   **Instructions**: Copy the full content of `system_prompt.md` from this project and paste it into the instructions field.
    *   **Model**: Select `gpt-4o` for the best balance of performance and cost.
    *   **Temperature**: Set to `1.0`.
    *   **Top P**: Set to `1.0`.
    *   Enable the **Retrieval** tool.

3.  **Create a Vector Store for Resumes**
    *   Navigate to the [Storage page](https://platform.openai.com/storage/vector_stores) and create a new vector store.
    *   Give the vector store a name (e.g., "Team Resumes").
    *   Upload the team members' resume files into this vector store.
    *   Return to your assistant's configuration page. Under the **Retrieval** tool section, attach the newly created vector store.
    *   Save the assistant.

4.  **Create an API Key**
    *   Go to the [API Keys page](https://platform.openai.com/api-keys).
    *   Click **Create new secret key**.
    *   Name your key, create it, and **copy it immediately**. You will not be able to see it again.

5.  **Get Your Assistant ID**
    *   On the [Assistants page](https://platform.openai.com/assistants), you will see your newly created assistant. The ID (e.g., `asst_...`) is listed there. Copy it.

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mucahitkayadan/team-chatbot.git
   cd group3-chatbot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory. Use the Assistant ID and API Key you created in the "OpenAI Assistant and API Key Setup" section.
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ASSISTANT_ID=your_assistant_id_here
   NEXT_PUBLIC_APP_NAME="Group 3 Chatbot"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Vercel Deployment

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel:**
   
   In your Vercel dashboard, add the same environment variables you used for local development:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ASSISTANT_ID`: Your Assistant ID
   - `NEXT_PUBLIC_APP_NAME`: `Group 3 Chatbot`

## Project Structure

```
group3-chatbot/
├── src/
│   ├── app/
│   │   ├── api/chat/          # API routes for chat functionality
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Main page
│   ├── components/
│   │   ├── ChatInterface.tsx  # Main chat component
│   │   ├── ChatInput.tsx      # Input component
│   │   ├── MessageBubble.tsx  # Message display
│   │   └── LoadingIndicator.tsx # Loading animation
│   ├── config/
│   │   └── env.ts            # Environment configuration
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.js            # Next.js configuration
├── vercel.json               # Vercel deployment configuration
└── package.json              # Dependencies and scripts
```

## API Endpoints

### POST /api/chat

Sends a message to the OpenAI Assistant and returns the response.

**Request Body:**
```json
{
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assistant response"
}
```

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the color scheme in `tailwind.config.js`
2. Updating component styles in `src/app/globals.css`
3. Adjusting individual component styling

### Assistant Configuration

To use a different OpenAI Assistant:

1. Update the `ASSISTANT_ID` environment variable
2. Ensure your OpenAI account has access to the specified assistant

## Technologies Used

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Integration:** OpenAI Assistant API
- **Deployment:** Vercel

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured" error:**
   - Ensure your `.env.local` file contains a valid `OPENAI_API_KEY`
   - Check that the environment variable is properly set in Vercel

2. **Assistant not responding:**
   - Verify the `ASSISTANT_ID` is correct
   - Check your OpenAI account has sufficient credits
   - Ensure the assistant exists and is accessible

3. **Build errors:**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors with `npm run lint`

## Support

For issues or questions, please contact the Group 3 development team.

## License

This project is for educational purposes as part of the Group 3 coursework. 
