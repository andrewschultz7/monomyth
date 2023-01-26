import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useAuthContext } from "./AppAuth";

const UserDetail = (props) => {
  const [user, setUsers] = useState();
  const { token } = useAuthContext();

  const { token: tokenState, setToken } = props;

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
        console.log("after response ", userdata)
      }
    }
    getUserFetch();
  }, []);

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
            <tr key={user.email}>
              <td>{user.email}</td>
              {/* {users?.map((user) => {
              return (
                <tr key={user.email}>
                  <td>{user.email}</td>
                </tr>
              );
            })} */}
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
