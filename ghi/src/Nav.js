import { NavLink, Link } from "react-router-dom";
import "./index.css";

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            MonoMyth
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link dropdown-item text-white"
                  aria-current="page"
                  to="/"
                  id="dropdown"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <Link
                  className="nav-link dropdown-item text-white"
                  to="/campaignform"
                  id="dropdown"
                >
                  Create Campaign
                </Link>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link dropdown-item text-white"
                  to="/campaignlist"
                  id="dropdown"
                >
                  Campaign List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link dropdown-item text-white"
                  to="/userdetail"
                  id="dropdown"
                >
                  User Details
                </NavLink>
              </li>
            </ul>
            <li>
              <NavLink
                className="nav-link dropdown-item text-white"
                to="login"
                id="dropdown"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link dropdown-item text-white"
                to="logout"
                id="dropdown"
              >
                Logout
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link dropdown-item text-white"
                to="/signupform"
                id="dropdown"
              >
                Sign up
              </NavLink>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
