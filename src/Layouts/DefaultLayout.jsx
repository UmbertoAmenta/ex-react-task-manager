import { Outlet } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";

export default function DefaultLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
