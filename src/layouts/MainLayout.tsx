import HomePage from "@/pages/HomePage";
import TopNavbar from "../components/common/TopNavbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <TopNavbar />
      <div className="mx-auto mt-20 max-w-7xl">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
