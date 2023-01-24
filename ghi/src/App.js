import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage'
import CampaignDetail from './CampaignDetail';
import CampaignEdit from './CampaignEdit';
import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';
import EventDetail from './EventDetail';
import EventEdit from './EventEdit';
import EventForm from './EventForm';
import EventList from './EventList';
import LoginForm from './Users/Login';
import Logout from './Users/Logout';
import ParticipantForm from './ParticipantForm';
import ParticipantList from './ParticipantList';
import SignUpForm from './Users/SignUpForm';
import UserList from './UserList';
import './App.css';
import { AuthProvider, useToken } from './AppAuth';
import { useAuthContext } from './AppAuth';

function GetToken() {
    useToken();
    return null
}

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <GetToken />
      <Nav />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Campaigns/:campaignId/" element={<CampaignDetail />} />
          <Route path="/Campaigns/:campaignId/edit" element={<CampaignEdit />} />
          <Route path="/CampaignForm" element={<CampaignForm />} />
          <Route path="/CampaignList" element={<CampaignList />} />
          <Route path="/Campaigns/:campaignId/:eventId" element={<EventDetail />} />
          <Route path="/Campaigns/:campaignId/:eventId/edit" element={<EventEdit />} />
          <Route path="/EventForm" element={<EventForm />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Campaigns/:campaignId/:eventId/ParticipantForm" element={<ParticipantForm />} />
          <Route path="/ParticipantList" element={<ParticipantList />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/UserList" element={<UserList />} />
        </Routes>
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
