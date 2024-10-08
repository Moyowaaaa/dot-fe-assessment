import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full  mx-auto min-h-screen max-h-[100rem]  h-screen relative">
      <Navbar />
      <div className="w-full h-max  w-full flex bg-[#f1f0f5] ">
        <Sidebar />
        <div className="w-full mx-auto h-max ">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
