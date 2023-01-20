import { useEffect, useState } from 'react';
import { getTokenInternal, useToken} from "../AppAuth"
import { Navigate, useNavigate } from "react-router-dom";

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}


function SignUpForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('');
    // const[users, setUsers] = useState('');
    const [token, login, logout, signup] = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(username, password);
        let data = {}
        data.email=username
        data.password=password
        // data.role=role
        // data.users=users
        console.log(data)
        const signupUrl = `${process.env.REACT_APP_USERS_API_HOST}/signup`
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include"
        };
        await fetch(signupUrl, fetchConfig)
        .then(response => response.json())
        .then(() => {
            setUsername('');
            setPassword('');
            // setRole('');
            // setUsers('');
        })
        .catch(e => console.log('error: ', e));
        navigate("/");
    };

    // useEffect(() => {
    //     async function getRole() {
    //         const url = '${process.env.REACT_APP_API}/monomyth/user/role'
    //         const response = fetch(url);
    //         if (response.ok) {
    //             const data = await (await response).json();
    //             setRole(data);
    //         }
    //     }
    //     getRole();
    // }, [setRole])


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
                            onChange={e => setUsername(e.target.value)}
                            type="email" />

                        <BootstrapInput
                            id="password"
                            placeholder="Enter Password"
                            labelText="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password" />

                        {/* <div classname="mb-4">
                            <label htmlFor="role" className="form-label">Choose Your Role</label>
                            <select className="form-select" id="role"aria-label="Choose Your Role">
                                <option>Open this select menu</option>
                                {user.role.map(role => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        {/* <button className="btn btn-outline-secondary btn-lg px-2 gap-1">Submit</button> */}
                        <button onClick={handleSubmit} className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
    );
}

export default SignUpForm;
