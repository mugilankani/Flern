import React, { useState, useEffect } from "react";
import modules from "../../data/modules";
import content from "../../data/content";
import SideNav from "../Quiz/sidenav";

export default function Content() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [fillInTheBlankAnswer, setFillInTheBlankAnswer] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const totalQuestions = content.quiz.length;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setFillInTheBlankAnswer("");
      setShortAnswer("");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptionIndex(null);
      setFillInTheBlankAnswer("");
      setShortAnswer("");
    }
  };

  const currentQuestion = content.quiz[currentQuestionIndex];

  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleQuestionClick = (number) => {
    setCurrentQuestionIndex(number - 1);
    setSelectedOptionIndex(null);
    setFillInTheBlankAnswer("");
    setShortAnswer("");
  };

  const handleCompleteQuestion = () => {
    if (!completedQuestions.includes(currentQuestionIndex + 1)) {
      setCompletedQuestions([...completedQuestions, currentQuestionIndex + 1]);
    }
  };

  const initialTime = 30 * 30;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex w-full">
      <div className="w-full bg-[#F6F6F5] rounded-l-2xl p-6 overflow-y-scroll h-screen">
        <div className="flex justify-between">
          <h1 className="text-[2rem] font-semibold px-6">{modules[0]?.title}</h1>
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
            <div className="bg-black h-16 flex items-center px-6 rounded-t-3xl">
              <h3 className="text-white text-lg">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </h3>
            </div>

            <div className="px-8 py-10">
              <p className="text-[1.35rem] text-[#565656]">{currentQuestion.question}</p>
            </div>
            
            <div className="px-8 pb-8 space-y-4">
              {currentQuestion.questionType === "1" && currentQuestion.options ? (
                currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center rounded-lg p-4 transition-colors
                      ${selectedOptionIndex === index ? 'bg-[#C4FAC6]' : 'bg-white hover:bg-gray-50'}`}
                    onClick={() => handleOptionClick(index)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center mr-4">
                      <span className="text-gray-600">{index + 1}</span>
                    </div>
                    <p className="text-gray-800">{option}</p>
                  </div>
                ))
              ) : currentQuestion.questionType === "2" ? (
                <input
                  type="text"
                  className="w-full p-4 border rounded-lg"
                  placeholder="Type your answer here..."
                  value={fillInTheBlankAnswer}
                  onChange={(e) => setFillInTheBlankAnswer(e.target.value)}
                />
              ) : currentQuestion.questionType === "3" ? (
                <textarea
                  className="w-full p-4 border rounded-lg"
                  placeholder="Write your answer here..."
                  value={shortAnswer}
                  onChange={(e) => setShortAnswer(e.target.value)}
                ></textarea>
              ) : null}
            </div>

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
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        completedQuestions={completedQuestions}
        onQuestionClick={handleQuestionClick}
      />
    </div>
  );
}
