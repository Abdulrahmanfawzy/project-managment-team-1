import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./app";
import "./i18n";
import InternetServiceProvider from "./Providers/InternetServiceProvider";
import  { Toaster } from 'react-hot-toast';
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InternetServiceProvider>
      <Toaster />
      <RouterProvider router={router} />
    </InternetServiceProvider>
  </StrictMode>,
);
