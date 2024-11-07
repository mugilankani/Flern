import React from "react";
import SideNav from "../components/Dashboard/Sidebar";
import Content from "../components/Dashboard/Content";

function Dashboard() {
  return (
    <div className="flex h-full w-full overflow-y-hidden rounded-2xl">
      <Content />
      <SideNav />
    </div>
  );
}

export default Dashboard;
