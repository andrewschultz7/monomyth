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

function CampaignForm(props) {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [rulebook, setRulebook] = useState('');
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState('');
    const [token, campaign] = useToken();


    const handleSubmit = async (e) => {
        e.preventDefault();
        campaign(title, genre, rulebook, email, detail)
        console.log({title, genre, rulebook, email, detail});
    };
    // const [user, setUser] = useState({})
    // const campaign = token[6]

    // useEffect(
    //     async function handleSubmit (event) => {
    //         event.preventDefault();
    //         await campaign(title, genre, rulebook, email, detail);
    //         console.log({title, genre, rulebook, email, detail});
    // })



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
                <form action="/" className="form" id="form2" onSubmit={(e) => handleSubmit(e)}>
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
