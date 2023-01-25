import React, { useState, useEffect } from "react";
import { useAuthContext } from "../AppAuth";
// import { Link, useParams } from "react-router-dom";

const UserDetail = () => {
  const [email, setEmail] = useState([]);
  const [users, setUsers] = useState([]);
  const { token } = useAuthContext();

  useEffect(() => {
    async function getUser() {
      const url = `${process.env.REACT_APP_USERS_API_HOST}/current`;
      if (token) {
        console.log("token exists");
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token.access_token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } else {
        console.log("setUsers did not work");
      }
    }
    getUser();
  }, [token]);

  return (
    <div className="container-fluid">
      <h2>User detail</h2>
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
