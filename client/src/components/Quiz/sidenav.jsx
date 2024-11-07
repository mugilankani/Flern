import { useNavigate } from "react-router-dom";
export default function SideNav({
  currentQuestion,
  totalQuestions,
  completedQuestions,
  reviewedQuestions,
  onQuestionClick,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-[40%] rounded-tr-3xl bg-[#EFEFEF] text-black">
      <h1 className="text-2xl font-semibold mb-8">Questions:</h1>
      
      <div className="grid grid-cols-3 gap-3 max-w-[410px] px-10">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => onQuestionClick(number - 1)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium transition-colors duration-200 mt-8
              ${number === currentQuestion ? 'bg-[#C4FAC6]' : ''}
              ${completedQuestions.includes(number - 1) ? 'bg-pink-300' : ''}
              ${reviewedQuestions.includes(number - 1) ? 'bg-purple-300' : ''}
              ${!completedQuestions.includes(number - 1) && !reviewedQuestions.includes(number - 1) ? 'border-2 border-gray-400' : ''}
            `}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="mt-auto fixed bottom-8 text-xl font-medium hover:text-gray-600 transition-colors"
        onClick={() => navigate("/result")}
      >
        Finish
      </button>
    </div>
  );
}
