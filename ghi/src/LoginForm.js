import { useEffect, useState } from 'react';
import { useToken, useAuthContext } from './AppAuth';




function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}


function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line
    const [token, login] = useToken();

    function submitLogin() {
        login(email, password)
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                    <h1>Login</h1>
                    <form>
                        <BootstrapInput
                            id="email"
                            placeholder="you@example.com"
                            labelText="Your email here"
                            value={email}
                            onSubmit={submitLogin}
                            onChange={e => setEmail(e.target.value)}
                            type="email" />

                        <BootstrapInput
                            id="password"
                            placeholder="Enter Password"
                            labelText="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password" />
                        {/* <button className="btn btn-outline-secondary btn-lg px-2 gap-1">Submit</button> */}
                        <button  type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
    );
}

export default LoginForm;
