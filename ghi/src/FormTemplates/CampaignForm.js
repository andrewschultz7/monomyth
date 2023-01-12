import { useState } from 'react';

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
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [rulebook, setRulebook] = useState('');
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState('');

    return (
        <form>
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}


export default CampaignForm;
