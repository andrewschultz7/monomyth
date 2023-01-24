import { NavLink, Link } from 'react-router-dom';
import './index.css'



function Nav() {


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">MonoMyth</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Home">Home</NavLink>
              </li>
              <div className="dropdown">
                <button className="btn btn-outline-light dropdown-toggle mr-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-display="static" aria-haspopup="true" aria-expanded="false">
                  Create...
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link className="nav-link dropdown-item" to="/CampaignForm" id="dropdown">Create Campaign</Link>
                  </li>
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/Campaigns/:campaignID/EventForm" id="dropdown">Create Events</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/Campaigns/:campaignID/:eventID/ParticipantForm" id="dropdown">Create Participant</NavLink>
                  </li>
                    <li>
                      <NavLink className="nav-link dropdown-item" to="login" id="dropdown">Login</NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link dropdown-item" to="logout" id="dropdown">Logout</NavLink>
                    </li>
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/SignUpForm" id="dropdown">Sign up</NavLink>
                  </li>
                </div>
              </div>
              <div className="dropdown">
                <button className="btn dropdown-toggle  btn-outline-light" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-display="static" aria-haspopup="true" aria-expanded="false">
                  List...
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/UserList" id="dropdown">User Info</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/CampaignList" id="dropdown">Campaign List</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/Campaigns/:id/" id="dropdown">Campaign Detail</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/Campaigns/:campaignId/EventList" id="dropdown">Event List</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link dropdown-item" to="/Campaigns/:campaignID/:eventID/ParticipantList" id="dropdown">Participant List</NavLink>
                  </li>
                </div>
              </div>
            </ul>
          </div>
          {/* <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">CarCar</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li> */}

          {/* </ul> */}
        </div>
      </nav>
    </>
  )
}



export default Nav;
