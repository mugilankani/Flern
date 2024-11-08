import React from "react";
import SideNav from "../components/Content/sidebar";
import Content from "../components/Content/content";

function LearningUnit() {
  return (
    <div className="flex h-full w-full overflow-y-hidden rounded-2xl">
      <Content />
      <SideNav />
    </div>
  );
}

export default LearningUnit;
