import React from "react";

import logo from "../../assets/img/logo.svg";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  const [activateLink, setActivateLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActivateLink(value);
  };
  //navbar link cssine bak
  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <LinkContainer to="">
          <Navbar.Brand>
            <img src={logo} alt={"Logo"} />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"> </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="">
              <Nav.Link
                className={
                  activateLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="about">
              <Nav.Link
                className={
                  activateLink === "about"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("about")}
              >
                About us
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="contact">
              <Nav.Link
                to="contact"
                className={
                  activateLink === "Contact"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("Contact")}
              >
                Contact
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="login">
              <Nav.Link
                className={
                  activateLink === "Login"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("Login")}
              >
                Log In
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <span className="navbar-text">
            <LinkContainer to="contact">
              <button className="vvd">
                {" "}
                <span>Become member</span>{" "}
              </button>
            </LinkContainer>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
