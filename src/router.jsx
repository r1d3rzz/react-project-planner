import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./features/Dashboard/pages/DashboardPage";
import ProjectRouter from "./routers/ProjectRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  ...ProjectRouter,
]);

export default router;
