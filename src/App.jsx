import React from "react";

import Header from "./components/layout/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailedView from "./components/DetailedView/DetailedView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/city/:cityName",
    element: (
      <>
        <Header />
        <DetailedView />
      </>
    ),
  },
]);
function App() {
  return (
    <div className="min-h-screen p-6">
      <div className="  max-w-auto mx-auto">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
export default App;
