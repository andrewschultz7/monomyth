import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import MainPage from './MainPage'
import UserForm from './UserForm';
// import ErrorNotification from './ErrorNotification';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/automobiles/new" element={<AutomobileForm />} />
          <Route path="/automobiles" element={<AutomobileList />} /> */}
        </Routes>
        {/* <div className="container"> */}
        {/* <Routes> */}
        {/* <Route path="/" element={<MainPage />} /> */}

        {/* </Routes> */}
      </div>
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
