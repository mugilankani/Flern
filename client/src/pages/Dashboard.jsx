import React from "react";
import SideNav from "../Components/Dashboard/Sidebar";
import Content from "../Components/Dashboard/Content";

function Dashboard() {
  return (
    <div className="flex h-full w-full overflow-y-hidden rounded-2xl">
      <Content />
      <SideNav />
    </div>
  );
}

export default Dashboard;
