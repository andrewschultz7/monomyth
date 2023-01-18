import { useState, useEffect } from 'react';
import {useToken} from './AppAuth';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}

function EventForm(props) {
    const [eventname, setEventName] = useState('');
    const [venuename, setVenueName] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [participants, setParticipants] = useState('');
    const [token, event] = useToken();
    const [user, setUser] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        event(eventname, venuename, address, date, participants)
        console.log({eventname, venuename, address, date, participants});
    };

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
                <h1>Create A Campaign Event</h1>
                <form>
                    <BootstrapInput
                        id="eventname"
                        placeholder="Event Name"
                        labelText="Event Name"
                        value={eventname}
                        onChange={e => setEventName(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="venuename"
                        placeholder="Venue Name"
                        labelText="Venue Name"
                        value={venuename}
                        onChange={e => setVenueName(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="address"
                        placeholder="Address"
                        labelText="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="date"
                        placeholder="Event Date"
                        labelText="Event Date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        type="date" />
                    <BootstrapInput
                        id="participants"
                        placeholder="Participants"
                        labelText="Participants"
                        value={participants}
                        onChange={e => setParticipants(e.target.value)}
                        type="text" />
                    {/* <button className="btn btn-outline-secondary btn-lg px-2 gap-1">Submit</button> */}
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}


export default EventForm;
