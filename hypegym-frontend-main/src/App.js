import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import HomePage from "./Components/Home/Home";
import NavBar from "./Components/Navbar/NavBar";
import Login from "./Components/Login/Login";
import Error from "./Components/Error/Error";
import { useState, useEffect, useContext } from "react";
import DashboardAdmin from "./Components/Users/Owner/Dashboard/Dashboard";
import DashboardPT from "./Components/Users/PersonalTrainer/Dashboard/Dashboard";
import DashboardMember from "./Components/Users/Member/Dashboard/Dashboard";
import Profile from "./Components/Users/Profile/Profile";
import SideBar from "./Components/Utils/SideBar";
import ManageMembers from "./Components/Users/Owner/ManageMembers/ManageMembers";
import ManageTrainers from "./Components/Users/Owner/ManageTrainers/ManageTrainers";
import AuthContext from "./Components/Contexts/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";

function App() {
  const { auth, loading, role, getToken } = useContext(AuthContext);

  useEffect(() => {
    getToken();
  }, [auth]);

  if (loading) {
    return (
      <div className="main-div">
        <SideBar role={role} />
        <div className="spinner">
          <ProgressSpinner />
        </div>
      </div>
    );
  } else if (!auth) {
    return (
      <div className="not-auth">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Error auth={auth} />} />
        </Routes>
      </div>
    );
  } else {
    if (role === "SUPERADMIN") {
      return (
        <div className="main-div">
          <SideBar role={role} />
          <Routes>
            <Route exact path="/dashboard" element={<DashboardAdmin />} />
            <Route path="/manage-members" element={<ManageMembers />} />
            <Route path="/manage-trainers" element={<ManageTrainers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error auth={auth} />} />
          </Routes>
        </div>
      );
    } else if (role === "ADMIN") {
      return (
        <div className="main-div">
          <SideBar role={role} />
          <Routes>
            <Route exact path="/dashboard" element={<DashboardAdmin />} />
            <Route path="/manage-members" element={<ManageMembers />} />
            <Route path="/manage-trainers" element={<ManageTrainers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error auth={auth} />} />
          </Routes>
        </div>
      );
    } else if (role === "MEMBER") {
      return (
        <div className="main-div">
          <SideBar role={role} />
          <Routes>
            <Route exact path="/dashboard" element={<DashboardMember />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error auth={auth} />} />
          </Routes>
        </div>
      );
    } else {
      return (
        <div className="main-div">
          <SideBar role={role} />
          <Routes>
            <Route exact path="/dashboard" element={<DashboardPT />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="*" element={<Error auth={auth} />} />
          </Routes>
        </div>
      );
    }
  }
}

export default App;
