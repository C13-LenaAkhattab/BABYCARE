import React, { useContext } from "react";
import "./Navbar.css";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, setisLoggedIn, setTokenState, setUserId } =
    useContext(AppContext);
  const navigate=useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    setTokenState("");
    setUserId("");
    setisLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar bg-third-color fixed-top navbar-thick">
        <div className="container-fluid">
          <a className="navbar-brand text-second-color funky-font" href="#">
            Mommy's World
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header bg-second-color">
              <h5
                className="offcanvas-title text-third-color funky-font"
                id="offcanvasNavbarLabel"
              >
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body bg-first-color">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active text-third-color funky-font"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-third-color funky-font" href="#">
                    Contact Us
                  </a>
                </li>
                {!isLoggedIn ? (
                  <li className="nav-item">
                    <a
                      onClick={() => {
                        navigate("/Login");
                      }}
                      className="nav-link text-third-color funky-font"
                      href="#"
                    >
                      Sign Up
                    </a>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <a
                        className="nav-link text-third-color funky-font"
                        href="#"
                      >
                        My Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-third-color funky-font"
                        href="#"
                      >
                        Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link text-third-color funky-font"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
