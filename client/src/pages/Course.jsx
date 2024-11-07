import React from "react";
import SideNav from "../Components/Course/Sidebar";
import Content from "../Components/Course/Content";

function Course() {
  return (
    <div className="flex h-full w-full overflow-y-hidden rounded-2xl">
      <Content />
      <SideNav />
    </div>
  );
}

export default Course;
