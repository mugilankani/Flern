import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Content() {
  const [modules, setModules] = useState([]);
  const [toggleStates, setToggleStates] = useState([]);
  const [course, setCourse] = useState(null);
  const [currentPath, setCurrentPath] = useState({ moduleIndex: 0, pathIndex: 0 });

  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const navigate = useNavigate()

  // Function to check if a learning path is clickable
  const isPathClickable = (moduleIndex, pathIndex) => {
    // First path of first module is always clickable
    if (moduleIndex === 0 && pathIndex === 0) return true;

    const currentModule = modules[moduleIndex];
    
    // For paths within the same module
    if (pathIndex > 0) {
      // Check if previous path in the same module is generated
      return currentModule.path[pathIndex - 1].metadata.generated === true;
    }
    
    // For first path of subsequent modules
    if (pathIndex === 0 && moduleIndex > 0) {
      // Check if all paths in previous module are generated
      const previousModule = modules[moduleIndex - 1];
      return previousModule.path.every(path => path.metadata.generated === true);
    }

    return false;
  };

  // Function to handle path click
  const handlePathClick = async (moduleIndex, pathIndex) => {
    if (!isPathClickable(moduleIndex, pathIndex)) {
      alert("Complete previous learning paths first!");
      return;
    }

    try {
      
      // Make API call to mark the path as generated
      const response = await axios.post(`http://localhost:3000/api/updatePath`, {
        courseId,
        moduleIndex,
        pathIndex,
        generated: true
      });

      // Update the local state with the new generated status
      setModules(prevModules => {
        const newModules = [...prevModules];
        newModules[moduleIndex].path[pathIndex].metadata.generated = true;
        return newModules;
      });

      setCurrentPath({ moduleIndex, pathIndex });

      const currentModule = modules[moduleIndex];
      const topic = currentModule.path[pathIndex].title
      const subject = course.title

      // You can add additional logic here for what happens when a path is clicked
      console.log(`Module ${moduleIndex + 1}, Path ${pathIndex + 1} clicked`);

      navigate(`/content/${courseId}/${moduleIndex}/${pathIndex}?topic=${topic}&subject=${subject}`)
      
    } catch (error) {
      console.error("Error updating path:", error);
    }
  };

  // Fetch course data
  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing in the URL");
      return;
    }

    const fetchCourseData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/course/find/${courseId}`);
        setCourse(res.data);
        setModules(res.data.modules);
        setToggleStates(Array(res.data?.modules?.length).fill(false));
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  return (
    <div className="h-screen w-full bg-neutral-100 p-6 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">
          {course ? course.title : "Loading..."}
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="h-10 w-60 rounded-3xl bg-neutral-200 px-5 text-sm placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      

      {modules.map((module, moduleIndex) => (
        <div key={moduleIndex}>
          <h1>Module {moduleIndex + 1}</h1>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 ">
            {module.path.map((path, pathIndex) => {
              const clickable = isPathClickable(moduleIndex, pathIndex);
              
              return (
                <div
                  key={pathIndex}
                  className={`relative rounded-3xl p-5 shadow-lg transition-all duration-200 
                    ${path.metadata.generated ? "bg-white" : "bg-neutral-200"}
                    ${clickable ? "hover:shadow-xl" : "opacity-50 cursor-not-allowed"}
                    ${currentPath.moduleIndex === moduleIndex && currentPath.pathIndex === pathIndex ? "ring-2 ring-blue-500" : ""}
                  `}
                  onClick={() => clickable && handlePathClick(moduleIndex, pathIndex)}
                >
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {path.title}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600">
                    {path.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className={`flex justify-center rounded-2xl py-2 px-3 text-xs font-medium text-neutral-800 
                      ${path.metadata.generated ? "bg-[#C4FAC6]" : "bg-neutral-200"}`}
                    >
                      {path.metadata.generated ? "Completed 👏" : "Pending"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Content;