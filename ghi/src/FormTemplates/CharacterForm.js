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


function CharacterForm(props) {
    const [character, setCharacter] = useState('');


    return (
        <form>
            <BootstrapInput
                id="character"
                placeholder="character"
                labelText="Your Character Name"
                value={character}
                onChange={e => setCharacter(e.target.value)}
                type="text" />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default CharacterForm;
