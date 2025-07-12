'use client'

interface ExampleQuestionsProps {
  onSendMessage: (message: string) => void
}

const ExampleQuestions: React.FC<ExampleQuestionsProps> = ({ onSendMessage }) => {
  const questions = [
    "Come up with some project ideas where all of the group members can contribute.",
    "Who in Group 3 has experience with full-stack web development?",
    "What are the AI interests of the team members?",
    "Who worked on natural language processing in Group 3?"
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-sm text-gray-600 mb-6">
      {questions.map((question, index) => (
        <div 
          key={index}
          className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
          onClick={() => onSendMessage(question)}
        >
          {question}
        </div>
      ))}
    </div>
  )
}

export default ExampleQuestions 