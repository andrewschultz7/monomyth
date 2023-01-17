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
// const CampaignForm = () => {
function CampaignForm(props) {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [rulebook, setRulebook] = useState('');
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState('');
    const token = useToken();
    const campaign = token[6];


    const handleSubmit = async (e) => {
        e.preventDefault();
        campaign(title, genre, rulebook, email, detail);
        console.log({title, genre, rulebook, email, detail});
    };

    // const handleTitleChange = (event) => {
    //     const value = event.target.value;
    //     setTitle(value)
    // }

    // const handleGenreChange = (event) => {
    //     const value = event.target.value;
    //     setGenre(value)
    // }

    // const handleRulebookChange = (event) => {
    //     const value = event.target.value;
    //     setRulebook(value)
    // }

    // const handleEmailChange = (event) => {
    //     const value = event.target.value;
    //     setEmail(value)
    // }

    // const handleDetailChange = (event) => {
    //     const value = event.target.value;
    //     setDetail(value)
    // }


    // const handleSubmit = (event ) => {
    //     event.preventDefault();
    //     const newCampaign=  {
    //         'title': title,
    //         'genre': genre,
    //         'rulebook': rulebook,
    //         'email': email,
    //         'detail': detail,

    //     }
    //     const campaignUrl = 'http://localhost:8000/CampaignForm/'
    //     const fetchConfig = {
    //         method: 'post',
    //         body: JSON.stringify(newCampaign),
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //     };
    //     fetch(campaignUrl, fetchConfig)
    //     .then(response => response.json())
    //     .then(() => {
    //         setTitle('');
    //         setGenre('');
    //         setRulebook('');
    //         setEmail('');
    //         setDetail('');
    //     })
    //     .catch(e => console.log(`error: `, e));
    // };


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Create A Campaign</h1>
                {/* <form action="/" className="form" id="form2" onSubmit={(e) => handleSubmit(e)}> */}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <BootstrapInput
                        id="title"
                        placeholder="you@example.com"
                        labelText="Your Campaign Title here"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="genre"
                        placeholder="Enter Genre"
                        labelText="genre"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="rulebook"
                        placeholder="Enter rulebook"
                        labelText="rulebook"
                        value={rulebook}
                        onChange={e => setRulebook(e.target.value)}
                        type="text" />
                    <BootstrapInput
                        id="email"
                        placeholder="Enter Contact Email"
                        labelText="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email" />
                    <BootstrapInput
                        id="detail"
                        placeholder="Enter Campaign Details"
                        labelText="detail"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                        type="text" />
                    {/* <button className="btn btn-outline-secondary btn-lg px-2 gap-1">Submit</button> */}
                    <button onClick={handleSubmit} className="btn btn-primary">Create Campaign</button>
                </form>
            </div>
        </div>
    );
}


export default CampaignForm;
