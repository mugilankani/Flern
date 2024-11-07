import React from "react";
import SideNav from "../components/Leaderboard/sidebar";
import Content from "../components/Leaderboard/content";

function Leaderboard() {
  return (
    <div className="flex h-full w-full overflow-y-hidden rounded-2xl">
      <Content />
      <SideNav />
    </div>
  );
}

export default Leaderboard;
