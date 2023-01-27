import React, { useState, useEffect } from "react";
import { useAuthContext } from "./AppAuth";

const UserDetail = (props) => {
  const [user, setUsers] = useState();
  const { token } = useAuthContext();

  console.log("user ", token);

  useEffect(() => {
    async function getUserFetch() {
      console.log("fire event", token);
      const response = await fetch(
        `${process.env.REACT_APP_USERS_API_HOST}/token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const userdata = await response.json();
        setUsers(userdata);
      }
    }
    if(token){
    getUserFetch();
    }
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
        {user ? (
          <tbody>
            <tr key={user.account.email}>
              <td>{user.account.email}</td>
            </tr>
          </tbody>
        ) : (
          ""
        )}
      </table>
    </div>
  );
};

export default UserDetail;
