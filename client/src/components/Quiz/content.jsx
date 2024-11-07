import React, { useState,useEffect } from "react";
import modules from "../../data/modules";
import content from "../../data/content";
import SideNav from "../Quiz/sidenav";  // Import the SideNav component

export default function Content() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // Track selected option index
  const [completedQuestions, setCompletedQuestions] = useState([]); // Track completed questions
  const totalQuestions = content.quiz.length;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null); // Reset selection on next question
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptionIndex(null); // Reset selection on previous question
    }
  };

  const currentQuestion = content.quiz[currentQuestionIndex];

  const handleOptionClick = (index) => {
    // Toggle the selected option
    setSelectedOptionIndex(selectedOptionIndex === index ? null : index);
  };

  const handleQuestionClick = (number) => {
    setCurrentQuestionIndex(number - 1);
    setSelectedOptionIndex(null); // Reset selection when jumping to another question
  };

  const handleCompleteQuestion = () => {
    if (!completedQuestions.includes(currentQuestionIndex + 1)) {
      setCompletedQuestions([...completedQuestions, currentQuestionIndex + 1]);
    }
  };

  const initialTime = 30 * 30;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Set up the countdown
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Convert timeLeft from seconds to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex w-full">
      {/* SideNav Component */}


      {/* Main Content */}
      <div className="w-full bg-[#F6F6F5] rounded-l-2xl p-6 overflow-y-scroll h-screen">
        <div className="flex justify-between">
            <h1 className="text-[2rem] font-semibold px-6">{modules[0].title}</h1>
            <div className="flex-col text-center bg-[#EBEBEB] p-2 px-5 rounded-2xl">
                <h2 className="font-normal text-[#4d4d4d]">Time left</h2>
                <h1 className="text-[1.2rem] font-medium">
                {hours > 0 ? `${hours} hr` : ""}
                {minutes > 0 ? ` ${minutes} min` : ""}
                {seconds > 0 || (hours === 0 && minutes === 0) ? ` ${seconds} sec` : ""}
                </h1>
            </div>
        </div>

        <div className="mt-6">
          <div className="bg-[#EBEBEB] rounded-3xl shadow-sm">
            {/* Question Header */}
            <div className="bg-black h-16 flex items-center px-6 rounded-t-3xl">
              <h3 className="text-white text-lg">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </h3>
            </div>

            {/* Question Text */}
            <div className="px-8 py-10">
              <p className="text-[1.35rem] text-[#565656]">{currentQuestion.question}</p>
            </div>

            {/* Options */}
            <div className="px-8 pb-8 space-y-4">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center rounded-lg p-4 transition-colors
                    ${selectedOptionIndex === index ? 'bg-[#C4FAC6]' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => handleOptionClick(index)} // Toggle selection
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center mr-4">
                    <span className="text-gray-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-800">{option}</p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="px-8 pb-6 flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            {/* Complete Question Button */}
            <button
              onClick={handleCompleteQuestion}
              className="mt-4 text-xl font-medium hover:text-gray-600 transition-colors"
            >
              Mark for Review
            </button>
          </div>
        </div>
      </div>
      <SideNav
        currentQuestion={currentQuestionIndex + 1}  // currentQuestion is 1-based in the SideNav
        totalQuestions={totalQuestions}
        completedQuestions={completedQuestions}
        onQuestionClick={handleQuestionClick}
      />
    </div>
  );
}
