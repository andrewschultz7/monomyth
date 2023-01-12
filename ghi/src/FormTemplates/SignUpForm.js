import { useEffect, useState } from 'react';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div classname="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}


function SignUpForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        async function getRole() {
            const url = '${process.env.REACT_APP_API}/monomyth/user/role'
            const response = fetch(url);
            if (response.ok) {
                const data = await (await response).json();
                setRole(data);
            }
        }
        getRole();
    }, [setRole])


    return (
        <form>
            <BootstrapInput
                id="email"
                placeholder="you@example.com"
                labelText="Your email here"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email" />

            <BootstrapInput
                id="password"
                placeholder="Enter Password"
                labelText="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password" />

            <div classname="mb-4">
                <label htmlFor="role" className="form-label">Choose Your Role</label>
                <select className="form-select" id="role"aria-label="Choose Your Role">
                    <option>Open this select menu</option>
                    {user.role.map(role => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default SignUpForm;
