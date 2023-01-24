import React from 'react';
import { useState, useEffect, Navigate } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const { campaignId } = useParams();
    const [eventname, setEventName] = useState('');
    const [venuename, setVenueName] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [participants, setParticipants] = useState('');
    const [campaign, setCampaign] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data= {}
        data.eventname=eventname
        data.venuename=venuename
        data.address=address
        data.date=date
        data.participants=participants
        data.campaign_id=campaignId
        console.log(data)
        const eventUrl = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/events/`
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
        navigate(`/campaigns/${campaignId}/`);
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
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}


export default EventForm;
