import { useState, useEffect } from 'react';
import {useToken} from './AppAuth';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div classname="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}

function CampaignForm(props) {
    const [eventname, setEventName] = useState('');
    const [venuename, setVenueName] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [participants, setParticipants] = useState('');
    const [token] = useToken();
    const [user, setUser] = useState({})



    // useEffect(() => {
    //     async function getUser() {
    //         const userUrl = "https://localhost:8000/current";
    //         let fetchOptions = {
    //             "credentials": include
    //         }
    //         const response = await fetch(userUrl, fetchOptions);
    //         if (response.ok) {
    //             const user = await response.json();
    //             setUser(user)
    //         }
    //     }
    //     if (token) {
    //         getUser();
    //     } else {
    //         console.log("bad or no token")
    //     }
    // }, [token])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Create A Campaign</h1>
                <form>
                    <BootstrapInput
                        id="eventname"
                        placeholder="you@example.com"
                        labelText="Your Campaign eventname here"
                        value={eventname}
                        onChange={e => setEventName(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="venuename"
                        placeholder="Enter venuename"
                        labelText="venuename"
                        value={venuename}
                        onChange={e => setVenueName(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="address"
                        placeholder="Enter address"
                        labelText="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="date"
                        placeholder="Enter Contact date"
                        labelText="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        type="date" />
                    <BootstrapInput
                        id="participants"
                        placeholder="Enter Campaign participantss"
                        labelText="participants"
                        value={participants}
                        onChange={e => setParticipants(e.target.value)}
                        type="text" />
                    {/* <button className="btn btn-outline-secondary btn-lg px-2 gap-1">Submit</button> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}


export default CampaignForm;
