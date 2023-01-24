import React, { useState, useEffect } from 'react'
import { useAuthContext } from './AppAuth'
import { Link, useParams } from 'react-router-dom'


const ParticipantList = () => {
    const [participants, setParticipants] = useState([]);
    const { token } = useAuthContext();
    const { campaignId, eventId } = useParams();

    useEffect(() => {
        async function getParticipant() {
            console.log(campaignId, "cam+ID", eventId, "event+ID")
            const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/Campaigns/${campaignId}/events/${eventId}/ParticipantList`;
            if (token) {
                console.log("hello little token")
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: "include"
                    });
                if (response.ok) {
                const data = await response.json();
                setParticipants(data);
                }
            }
            else {
                console.log("Hiiiiii")
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
                            <th></th>
                            <th>Character</th>
                            <th>Event</th>
                            <th>Campaign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants?.map((participant) => {
                            return(
                                <tr key={participant.participant_id}>
                                    <td>{participant.character}</td>
                                    <td>{participant.event_id}</td>
                                    <td>{participant.campaign_id}</td>

                              </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}

export default ParticipantList




// class ParticipantList extends React.Component {

//     async componentDidMount() {
//         const url = `http://localhost:8100/api/models/`
//         const response = await fetch(url)
//         if (response.ok) {
//             const data = await response.json()
//             this.setState({models : data.models})
//         }
//     }


//     render(){
//     return(
//         <div className="container-fluid">
//             <h1>Participant List</h1>
//             <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Character</th>
//                             <th>Email</th>
//                             <th>Event</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state?.participants?.map(participants => {
//                             return(
//                                 <tr key={participants.participant_id}>
//                                     <td>{participants.character}</td>
//                                     <td>{participants.email}</td>
//                                     <td>{participants.event}</td>
//                                     {/* <td><img src={participants.picture_url} className='img-thumbnail' width="300px" height="300px"/></td> */}
//                               </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//         </div>
//     )
// }
// }

// export default ParticipantList
