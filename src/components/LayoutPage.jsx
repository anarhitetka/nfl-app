import { Link, Outlet } from "react-router-dom";
const LayoutPage = () => {
  return (
    <>
      <Link to="/">
        <h2 style={{ textAlign: "center" }}>NFL APP</h2>
      </Link>
      <Link to="/weeks">
        <button>See games by week</button>
      </Link>
      <Link to="/teams">
        <button>See all teams</button>
      </Link>
      <Outlet />
    </>
  );
};
export default LayoutPage;
