import React, { useState, useEffect } from 'react'
import { useAuthContext } from './AppAuth'



const ParticipantList = () => {
    const [participants, setParticipants] = useState([]);
    const { token } = useAuthContext();

    useEffect(() => {
        async function getParticipant() {
            const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/events/participants`;
            if (token) {
                const response = await fetch(url, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.access_token}`,
                  },
                  credentials: "include",
                });
                if (response.ok) {
                const data = await response.json();
                setParticipants(data);
                }
            }
            else {

            }
        }
        getParticipant();
    }, [token])

    return (
        <div className="container-fluid">
            <h1>Participant List</h1>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Character</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants?.map(participant => {
                            return(
                                <tr key={participant.participant_id}>
                                    <td>{participant.character}</td>
                              </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}

export default ParticipantList
