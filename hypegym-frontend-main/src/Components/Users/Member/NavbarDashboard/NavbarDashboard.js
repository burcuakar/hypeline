import { useRef, useState, useEffect } from "react";
import "./navbardashboard.css";
import { apiMe, getTrainers } from "../../../API";

function NavbarDashboard() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const [user, setuser] = useState();

  useEffect(() => {
    apiMe().then((response) => {
      setuser(response.data);
    });
  }, []);
  if (user) {
    return (
      <header>
        <h3>WELCOME,{user.name}</h3>
      </header>
    );
  }
}

export default NavbarDashboard;
