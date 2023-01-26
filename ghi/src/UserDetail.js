import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useAuthContext } from "./AppAuth";

const UserDetail = (props) => {
  const [users, setUser] = useState([]);
  const { token } = useAuthContext();
  const { token: tokenState, setToken } = props;

  console.log("user ", users);

  //   useEffect(() => {
  //     Promise.all([
  //       fetch(
  //         `${process.env.REACT_APP_USERS_API_HOST}/token`,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       )
  //     ])
  //       .then(([resUser]) =>
  //         Promise.all([
  //           resUser.json(),
  //         ])
  //       )
  //       .then(([dataUser]) => {
  //         setUser(dataUser);
  //         console.log("user ", users);
  //         console.log("token ", token);
  //       });
  //   }, []);

  useEffect(() => {
     const fireEvent = async (event) => {
       let data = event;
       const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;
       const fetchConfig = {
         method: "get",
         body: JSON.stringify(data),
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
         credentials: "include",
       };
       await fetch(url, fetchConfig)
         .then((response) => response.json())
         .then(() => {})
         .catch((event) => console.log(`error: `, event));
       setUser(users);
       console.log("users after fire ", users)
     };
     if (token) {
        fireEvent();
     }
  },[token]);

  return (
    <div className="container-fluid">
      <h2>User detail</h2>
      {token}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.email}>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail;
