import React, { useState } from "react";
import modules from "../../data/modules";
import Course from "../../data/courses";

function Content() {
  const [toggleStates, setToggleStates] = useState(
    Array(modules.length).fill(false)
  );

  const handleToggle = (index) => {
    setToggleStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="h-screen w-full rounded-l-2xl bg-neutral-100 p-6 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="max-w-72 px-6 text-2xl font-semibold leading-7">
          {Course[1].courseName}
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="h-10 w-60 rounded-3xl bg-neutral-200 px-5 text-sm placeholder:text-neutral-700"
        />
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <div className="flex items-end px-6">
          <p className="mr-6 font-medium">Module-1</p>
          <p>{modules[0].title}</p>
        </div>

        <div className="flex space-x-2">
          <div className="flex items-center gap-4 rounded-xl bg-blue-100 px-4 py-1 text-center font-medium">
            <p className="text-sm font-normal text-neutral-800">Total</p>
            <h1 className="text-xl font-bold">24</h1>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-green-200 px-4 py-1 text-center font-medium">
            <p className="text-sm font-normal text-neutral-800">Completed</p>
            <h1 className="text-xl font-bold">20</h1>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-neutral-200 px-4 py-1 text-center font-medium">
            <p className="text-sm font-normal text-neutral-800">
              Yet to complete
            </p>
            <h1 className="text-xl font-bold">4</h1>
          </div>
        </div>
      </div>

      <div className="mt-4 grid h-[calc(100vw-55.5rem)] grid-cols-1 gap-6 overflow-y-scroll pb-4 pr-3 md:grid-cols-2">
        {modules.map((module, index) => (
          <div
            key={index}
            className={`relative h-fit rounded-3xl bg-white p-5 shadow-md`}
          >
            <h2 className="w-48 text-2xl font-semibold">{module.title}</h2>
            <p className="mt-2 text-sm text-black">{module.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <div className="bg-button1 flex justify-center rounded-2xl py-2 text-xs font-medium text-neutral-800">
                {module.status}
              </div>
              <div
                className="ml-4 flex h-6 w-11 cursor-pointer items-center rounded-2xl bg-neutral-200 p-1"
                onClick={() => handleToggle(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 transition-transform duration-300 ${
                    toggleStates[index]
                      ? "translate-x-6 opacity-0"
                      : "translate-x-1 opacity-100"
                  }`}
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 transition-transform duration-300 ${
                    toggleStates[index]
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-6 opacity-0"
                  }`}
                >
                  <path d="M18 6 7 17l-5-5" />
                  <path d="m22 10-7.5 7.5L13 16" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
