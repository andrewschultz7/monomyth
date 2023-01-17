import { useEffect, useState } from 'react';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div classname="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder } />
        </div>
    )
}


function ParticipantForm(props) {
    const [character, setCharacter] = useState('');
    const [campaigns, setCampaigns] = useState('');

    useEffect(() => {
        async function getCampaigns() {
            const url = '${process.env.REACT_APP_API}/monomyth/campaigns'
            const response = fetch(url);
            if (response.ok) {
                const data = await (await response).json();
                setCampaigns(data);
            }
        }
        getCampaigns();
    }, [setCampaigns])


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Participate in a Campaign!</h1>
                <form>
                    <BootstrapInput
                        id="character"
                        placeholder="Character Name"
                        labelText="Your Character here"
                        value={character}
                        onChange={e => setCharacter(e.target.value)}
                        type="text" />


                    <div classname="mb-4">
                        <label htmlFor="Campaign" className="form-label">Choose Your Campaign</label>
                        <select className="form-select" id="campaign"aria-label="Choose Your Campaign">
                            <option>Open this select menu</option>
                            {campaigns.map(campaign => (
                                <option key={campaign} value={campaign}>
                                    {campaign}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                    <button disabled={campaigns.length === 0} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ParticipantForm;
