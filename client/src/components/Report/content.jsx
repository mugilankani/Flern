import React, { useState } from "react";
import modules from "../../data/modules";
import { ChevronDown, ChevronUp } from "lucide-react";
import quizData from "../../data/quizdata";


function QuestionCard({ question, index, totalQuestions, showExplanation, toggleExplanation }) {
  const isCorrect = question.userAnswer === question.correctAnswer;
  
  return (
    <div className="flex gap-4 mb-12 w-[1400px] mx-auto"> {/* Adjusted max width and centered content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span>Question {index + 1} of {totalQuestions}</span>
          <span>Mark {isCorrect ? "1" : "0"}/1</span>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`p-3 rounded-lg flex items-center gap-3
                  ${optionIndex === question.correctAnswer ? 'bg-[#C4FAC6]' : ''}
                  ${optionIndex === question.userAnswer && optionIndex !== question.correctAnswer ? 'bg-red-200' : ''}
                  ${optionIndex !== question.correctAnswer && optionIndex !== question.userAnswer ? 'bg-white' : ''}
                `}
              >
                <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-sm">
                  {optionIndex + 1}
                </span>
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-[750px] flex flex-col">
        <button
          onClick={() => toggleExplanation(index)}
          className="bg-white rounded-xl shadow-md p-4 text-left flex items-center justify-between hover:bg-gray-50"
        >
          <span className="font-medium">Show Explanation</span>
          {showExplanation ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {showExplanation && (
          <div className="mt-4 p-4 bg-white rounded-xl shadow-md">
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Content() {
  const score = 3;
  const [expandedExplanations, setExpandedExplanations] = useState({});

  const toggleExplanation = (index) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="w-full bg-[#F6F6F5] rounded-l-2xl p-6 overflow-y-scroll h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[2rem] text-[#D44120] font-semibold px-6">Report</h1>
          <h2 className="text-[1.5rem] font-semibold px-6">{modules[0].title}</h2>
        </div>
        <div className="text-center px-6">
          <h3 className="text-lg font-medium">Score</h3>
          <p className="text-2xl font-semibold">{score}/5</p>
        </div>
      </div>
      
      <div className="px-6">
        {quizData.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            index={index}
            totalQuestions={quizData.length}
            showExplanation={expandedExplanations[index]}
            toggleExplanation={toggleExplanation}
          />
        ))}
      </div>
    </div>
  );
}
