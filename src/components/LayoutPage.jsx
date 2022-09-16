import { Link, Outlet } from "react-router-dom";
const LayoutPage = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>NFL APP</h2>
      <Link to="/weeks">
        <button>See games by week</button>
      </Link>
      <Outlet />
    </>
  );
};
export default LayoutPage;
