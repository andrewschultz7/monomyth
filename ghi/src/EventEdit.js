import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import {useToken, useAuthContext} from './AppAuth';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}
function EventEdit(props) {
    console.log("PROPS: ", props)
    const { eventId } = useParams();
    const { campaignId } = useParams();
    const { token } = useAuthContext();
    const [eventname, setEventName] = useState('');
    const [venuename, setVenueName] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [participants, setParticipants] = useState('');
    const [event, setEvent] = useState('')
    const [campaign_id, setCampaign] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
            async function getEvent() {
                const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/events/${eventId}`;
                if (token) {
                    const response = await fetch(url, {
                        headers: { Authorization: `Bearer ${token.access_token}` },
                        });
                    if (response.ok) {
                    const data = await response.json();
                    setEvent(data);
                    }
                }
            }
            getEvent();
        }, [token.access_token])

      const handleSubmit = async (e) => {
        e.preventDefault();
        let data= {}
        data.event_id = {eventId}
         if (eventname === ''){
            data.eventname=event.eventname;
        } else {data.eventname=eventname};

        if (venuename === ''){
            data.venuename=event.venuename;
        } else {data.venuename=venuename};

        if (address === ''){
            data.address=event.address;
        } else {data.address=address};

        if (date === ''){
            data.date=event.date;
        } else {data.date=date};

        if (participants === ''){
            data.participants=event.participants;
        } else {data.participants=participants};

        data.campaign_id=campaignId

        console.log(data)
        const eventUrl = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/events/${eventId}`
        const fetchConfig = {
            method: 'put',
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
        navigate(`/campaigns/${campaignId}`);
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Edit An Event</h1>
                <form action="/">
                    <BootstrapInput
                        id="eventname"
                        placeholder={event.eventname}
                        labelText="Event Name"
                        value={eventname}
                        onChange={e => setEventName(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="venuename"
                        placeholder={event.venuename}
                        labelText="Venue Name"
                        value={venuename}
                        onChange={e => setVenueName(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="address"
                        placeholder={event.address}
                        labelText="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="date"
                        placeholder={event.date}
                        labelText="Event Date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        type="date" />
                    <BootstrapInput
                        id="participants"
                        placeholder={event.participants}
                        labelText="Participants"
                        value={participants}
                        onChange={e => setParticipants(e.target.value)}
                        type="text" />
                    <button onClick={handleSubmit} className="btn btn-primary">Edit</button>
                </form>
            </div>
        </div>

    );
}


export default EventEdit