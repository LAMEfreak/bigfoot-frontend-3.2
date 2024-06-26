import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import List from "./List.jsx";
import Sighting from "./Sighting.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sightings/:sightingIndex",
        element: <Sighting />,
      },
      {
        path: "/",
        element: <List />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
