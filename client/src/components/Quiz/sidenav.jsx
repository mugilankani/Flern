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
      <h1 className="text-2xl font-semibold mt-7 px-3 py-2">Questions:</h1>
      
      <div className="grid grid-cols-3 gap-3 max-w-[410px] px-10 py-4 ">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => onQuestionClick(number - 1)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium transition-colors duration-200 mt-8
              ${number === currentQuestion ? 'bg-pink-300' : ''}
              ${completedQuestions.includes(number - 1) ? ' bg-[#C4FAC6]' : ''}
              ${reviewedQuestions.includes(number - 1) ? 'bg-[#f4c75f]' : ''}
              ${!completedQuestions.includes(number - 1) && !reviewedQuestions.includes(number - 1) ? 'border-2 border-gray-400' : ''}
            `}
          >
            {number}
          </button>
        ))}
      </div>
        <div className="ml-64 flex ">
            <button
            className=" rounded-2xl py-2 px-10 flex justify-center bg-[#E98390] w-5 fixed bottom-10 text-xl font-medium hover:text-gray-600 transition-colors"
            onClick={() => navigate("/result")}
          >
            Finish
          </button>
        </div>

    </div>
  );
}
