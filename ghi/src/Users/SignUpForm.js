import { useState } from 'react';
import { useAuthContext, useToken} from "../AppAuth"
import { useNavigate } from "react-router-dom";

function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signup = useToken()[3];
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(username, password);
    let data = {};
    data.email = username;
    data.password = password;
    const signupUrl = `${process.env.REACT_APP_USERS_API_HOST}/signup`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      credentials: "include",
    };
    await fetch(signupUrl, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setUsername("");
        setPassword("");
      })
      .catch((e) => console.log("error: ", e));
    navigate("/campaignlist");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Sign Up</h1>
        <form>
          <BootstrapInput
            id="email"
            placeholder="you@example.com"
            labelText="Your email here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="email"
          />

          <BootstrapInput
            id="password"
            placeholder="Enter Password"
            labelText="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
