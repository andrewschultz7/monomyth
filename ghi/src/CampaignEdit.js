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
function CampaignEdit(props) {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState([]);
    const { token } = useAuthContext();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [rulebook, setRulebook] = useState('');
    const [campaign_email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
            async function getCampaign() {
                const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}`;
                if (token) {
                    const response = await fetch(url, {
                        headers: { Authorization: `Bearer ${token}` },
                        });
                    if (response.ok) {
                    const data = await response.json();
                    setCampaign(data);
                    }
                }
            }
            getCampaign();
        }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data= {}
        data.campaign_id={campaignId}
        data.title=title
        data.genre=genre
        data.description=description
        data.rulebook=rulebook
        data.campaign_email=campaign_email
        data.users=users
        console.log(data)
        const campaignUrl = `http://localhost:8001/campaigns/${campaignId}`
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            },
            credentials : "include"
        };
        await fetch(campaignUrl, fetchConfig)
        .then(response => response.json())
        .then(() => {
            setTitle('');
            setGenre('');
            setRulebook('');
            setEmail('');
            setUsers('');
            setDescription('');
        })
        .catch(e => console.log(`error: `, e));
        navigate(`/Campaigns/${campaignId}/`);
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Edit A Campaign</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <BootstrapInput
                        id="title"
                        // placeholder="you@example.com"
                        placeholder={campaign.title}
                        labelText="Your Campaign Title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="genre"
                        placeholder={campaign.genre}
                        labelText="genre"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="rulebook"
                        placeholder={campaign.rulebook}
                        labelText="rulebook"
                        value={rulebook}
                        onChange={e => setRulebook(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="email"
                        placeholder={campaign.campaign_email}
                        labelText="email"
                        value={campaign_email}
                        onChange={e => setEmail(e.target.value)}
                        type="email" />
                    <BootstrapInput
                        id="detail"
                        placeholder={campaign.description}
                        labelText="detail"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        type="text" />
                    {/* <button className="btn btn-outline-secondary btn-lg px-2 gap-1">Submit</button> */}
                    <button onClick={handleSubmit} className="btn btn-primary">Edit Campaign</button>
                </form>
            </div>
        </div>

    );
}


export default CampaignEdit
