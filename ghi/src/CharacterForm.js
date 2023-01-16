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
        <div className="row">
            <div className="offset-3 col-6">
                    <h1>Create a new Character</h1>
                    <form>
                        <BootstrapInput
                            id="character"
                            placeholder="character"
                            labelText="Your Character Name"
                            value={character}
                            onChange={e => setCharacter(e.target.value)}
                            type="text" />
                        {/* <button className="btn btn-outline-secondary btn-lg px-2 gap-1">Submit</button> */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
    );
}

export default CharacterForm;
