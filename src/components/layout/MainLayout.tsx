import React from "react";
import Nav from "../shared/Nav";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Toaster />
      <Nav />

      <main className=" flex items-center justify-center flex-1">
        <div className="w-90 bg-white rounded-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
