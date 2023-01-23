import React from 'react';
import { useState, useEffect } from 'react';
import {useToken} from './AppAuth';
import { useNavigate } from "react-router-dom";

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
    const [campaign, setCampaign] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data= {}
        data.eventname=eventname
        data.venuename=venuename
        data.address=address
        data.date=date
        data.participants=participants
        data.campaign=campaign
        console.log(data)
        const eventUrl = 'http://localhost:8001/events'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            },
            credentials : "include"
        };
        await fetch(eventUrl, fetchConfig)
        .then(response => response.json())
        .then(() => {
            setEventName('');
            setVenueName('');
            setAddress('');
            setDate('');
            setParticipants('');
            setCampaign('');
        })
        .catch(e => console.log(`error: `, e));
        navigate('/CampaignList');
    };


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Create An Event</h1>
                <form action="/">
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
                    {/* <button onClick={handleSubmit} => {Navigate("/signup-user")}>Create User</button> */}
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}


export default EventForm;
