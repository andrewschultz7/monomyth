import { useState } from 'react';

function UserForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [campaign, setCampaign] = useState('');

    return (
        <form>
            <div classname="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value_)} required type="email" className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <div classname="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value_)} required type="password" className="form-control" id="password" placeholder="Enter your password here" />
            </div>
            <div classname="mb-3">
                <label htmlFor="campaign" className="form-label">Campaign</label>
                <input value={campaign} onChange={e => setCampaign(e.target.value_)} required type="text" className="form-control" id="campaign" placeholder="Campaign" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default UserForm;
