import React from "react";
import ReactDOM from "react-dom/client";
import { Attendees } from "./Attendees.tsx";
import { Events } from "./Events.tsx";
import { Toaster } from "./components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Events />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/eventos",
        element: <Events />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/eventos/:slug/participantes",
    element: <Attendees />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
