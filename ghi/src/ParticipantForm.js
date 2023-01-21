import React from 'react';
import { useState, useEffect } from 'react';
import {getToken, useToken} from './AppAuth';
// import { useNavigate } from 'react-router-dom';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}


function ParticipantForm(props) {
    const [character, setCharacter] = useState('');
    const [campaigns, setCampaigns] = useState('');
    const [events, setEvents] = useState('');

const handleSubmit = async (e) => {
        e.preventDefault();
        // debugger;
        let data= {}
        data.character=character
        data.campaigns=campaigns
        console.log(data)
        const participantsUrl = 'http://localhost:8001/events/participants'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            },
            credentials : "include"
        };
        await fetch(participantsUrl, fetchConfig)
        .then(response => response.json())
        .then(() => {
            setCharacter('');
            setCampaigns('');
            setEvents('');
        })
        .catch(e => console.log(`error: `, e));
        // useNavigate("/");
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Participate in an Event!</h1>
                <form onSubmit={handleSubmit}>
                    <BootstrapInput
                        id="character"
                        placeholder="Character Name"
                        labelText="Your Character here"
                        value={character}
                        onChange={e => setCharacter(e.target.value)}
                        type="text" />
                    <button  type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ParticipantForm;
