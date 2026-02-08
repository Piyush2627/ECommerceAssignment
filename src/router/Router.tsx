import HomepageProducts from "@/components/HomepageProducts";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "category/:categoryName",
        element: <HomepageProducts />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
