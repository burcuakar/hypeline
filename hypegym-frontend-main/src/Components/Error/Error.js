import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Error(auth) {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <h1>Loading..</h1>;
}

export default Error;
