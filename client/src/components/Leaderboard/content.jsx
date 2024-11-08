import React from "react";
import { useNavigate } from "react-router-dom";
import userData from "../../data/userData";
import Bronze from "../../assets/bronze.svg";

function Content() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col overflow-y-scroll bg-neutral-100 p-6">
      <div className="flex justify-between">
        <h1 className="mt-2 font-sans text-2xl font-semibold">Top Peers</h1>
        <input
          type="text"
          placeholder="Search"
          className="h-10 w-60 rounded-3xl bg-neutral-200 px-5 text-sm py-1 placeholder:text-neutral-700"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {userData.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center"
          >
            {user.league === "Bronze" && (
              <img
                src={Bronze}
                alt="Bronze League Badge"
                className="h-24 w-24 pt-6 pl-9"
              />
            )}
            <div className="flex flex-col items-center mt-4">
              <h1 className="text-lg font-semibold">{user.userName}</h1>
              <img
                className="h-24 w-24 mt-2 rounded-full"
                src={user.userAvatar}
                alt="User avatar"
              />
            </div>

            <div className="bg-[#fcfcfc] w-full h-16 rounded-b-2xl mt-4 relative">
              {/* Progress bar */}
              <div
                className="absolute top-0 left-0 h-full bg-[#FAE8B4] rounded-bl-2xl"
                style={{ width: `${user.points}%` }}
              ></div>
              {/* Points Text */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-[1.4rem]">{user.points} Points</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;