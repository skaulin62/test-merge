import React from "react";
import Header from "../components/Header.tsx";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
