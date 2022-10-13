import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, [navigate]);
  return (
    <div>
      <h1>404</h1>
      <h2>GRONK NOT FOUND</h2>
      <p>Redirecting to home page...</p>
      <Link to="/">Go back home now</Link>
    </div>
  );
}
