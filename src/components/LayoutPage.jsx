import { Outlet } from "react-router-dom";
const LayoutPage = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>NFL APP</h2>
      <Outlet />
    </>
  );
};
export default LayoutPage;
