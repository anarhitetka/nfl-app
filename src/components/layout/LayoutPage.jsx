import { Outlet } from "react-router-dom";
import Navbar from "./NavBar/Navbar";

export default function LayoutPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
