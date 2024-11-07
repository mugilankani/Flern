import React from "react";
import Courses from "../../data/courses";
import Resume from "../../assets/resume.svg";
import { useNavigate } from "react-router-dom";

function Content() {
  const Navigate = useNavigate()
  return (
    <div className="flex w-full flex-col overflow-y-scroll bg-neutral-100 p-6">
      <h1 className="mt-2 font-sans text-2xl font-semibold">
        Top Peers
      </h1>
    </div>
  );
}

export default Content;
