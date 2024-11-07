import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideNav({ 
  currentQuestion = 1, 
  totalQuestions = 5, 
  completedQuestions = [], 
  onQuestionClick = () => {} 
}) {

  const navigate = useNavigate();

  return (
    <div className="w-[40%] rounded-tr-3xl bg-[#EFEFEF] text-black">
      <h1 className="text-2xl font-semibold mb-8">Questions:</h1>
      
      <div className="grid grid-cols-3 gap-3 max-w-[440px]">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => onQuestionClick(number)}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium
              transition-colors duration-200 mt-8
              ${number === currentQuestion ? 'bg-[#C4FAC6] border-2 border-[#C4FAC6]' : ''}
              ${completedQuestions.includes(number) ? 'bg-pink-300 border-2 border-pink-300' : ''}
              ${!completedQuestions.includes(number) && number !== currentQuestion ? 'border-2 border-gray-400' : ''}
            `}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="mt-auto fixed bottom-8 text-xl font-medium hover:text-gray-600 transition-colors"
        onClick={() => navigate('/quizresult')}
      >
        Finish
      </button>
    </div>
  );
}
