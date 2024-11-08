import React, { useEffect, useState } from "react";
import Courses from "../../data/courses";
import Resume from "../../assets/resume.svg";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Content() {
  const Navigate = useNavigate()
  const [courses,setCourses] =  useState()

  useEffect(() => {
    axios.get("http://localhost:3000/api/courses")
    .then((res) => {setCourses(res.data),console.log(res.data)} )
  },[])

  return (
    <div className="flex w-full flex-col overflow-y-scroll bg-neutral-100 p-6">
      <h1 className="mt-2 font-sans text-2xl font-semibold">
        Start learning now
      </h1>
      <div className="mb-6 mt-4 flex h-fit w-fit cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-black p-2 px-6 py-2.5 font-medium text-white shadow-md">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <line x1="12" x2="12" y1="8" y2="16" />
            <line x1="8" x2="16" y1="12" y2="12" />
          </svg>
        </span>
        New course
      </div>
      <hr className="mt-2" />
      <div className="mt-8 ml-14 grid w-[850px] grid-cols-1 gap-6 pb-6 md:grid-cols-2">
        {courses && courses.map((course, index) => (
          <div
          onClick={() => Navigate(`/course?id=${course._id}`)} // Pass the course ID here
          key={index}
          className="relative cursor-pointer  rounded-3xl border border-neutral-200 bg-white p-5 hover:shadow-lg"
          >
            {/* Button with Resume image */}
            <button
            onClick={() => Navigate(`/course?id=${course._id}`)} // Pass the course ID here
            className="absolute top-[-20px] right-[-15px] p-2 bg-transparent hover:bg-gray-200 rounded-full"
          >
              <img src={Resume} alt="Resume" className="h-10 w-10" />
            </button>

            <h2 className="w-[80%] py-0  text-[1.4rem] font-semibold leading-6">
              {course.title}
            </h2>
            <p className="mt-4 py-2 text-[0.81rem]  text-gray-600">
              {course.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="h-3 w-full rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: `${course.progress}%` }}
                  ></div>
              </div>
              <p className="text-xs font-medium">{course.progress}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
