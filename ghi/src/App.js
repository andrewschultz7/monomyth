import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage'
import UserForm from './UserForm';
import UserList from './UserList';
import LoginForm from './LoginForm';
import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';
import EventForm from './EventForm';
import EventList from './EventList';
import ParticipantForm from './ParticipantForm';
import ParticipantList from './ParticipantList';
// import ErrorNotification from './ErrorNotification';
import './App.css';
import { AuthProvider, useToken } from './AppAuth';


function GetToken() {
    // Get token from JWT cookie (if already logged in)
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
          <Route path="/UserForm" element={<UserForm />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/CampaignForm" element={<CampaignForm />} />
          <Route path="/CampaignList" element={<CampaignList />} />
          <Route path="/EventForm" element={<EventForm />} />
          <Route path="/EventList" element={<EventList />} />
          <Route path="/ParticipantForm" element={<ParticipantForm />} />
          <Route path="/ParticipantList" element={<ParticipantList />} />
          <Route path="/LoginForm" element={<LoginForm />} />
        </Routes>
      </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])


//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <MainPage info={launch_info} />
//     </div>
//   );
// }

// export default App;
