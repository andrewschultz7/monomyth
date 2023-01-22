import React, { useState, useEffect } from 'react'
import { useAuthContext } from './AppAuth'
import { Link, useParams } from "react-router-dom";

const CampaignDetail = () => {
    const [campaign, setCampaign] = useState([]);
    const { token } = useAuthContext();
    const { campaignId } = useParams();
    const [events, setEvents] = useState([]);
    // const [token, setToken] = useState([]);

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

        async function getEvent() {
            const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/events`;
            if (token) {
                console.log("token exists")
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                    });
                if (response.ok) {
                const data = await response.json();
                setEvents(data);
                }
            }
            else {
                console.log("Hello Event List")
            }
        }
        getEvent();
    }, [token])

    return (
        <div className="container-fluid">
            <h1>Campaign Details</h1>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Campaign ID</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Description</th>
                            <th>Rulebook</th>
                            <th>Campaign Contact Email</th>
                            <th>Users</th>
                        </tr>
                    </thead>
                    {campaign ? <tbody>
                        <tr key={campaign.campaign_id}>
                            <td>{campaign.campaign_id}</td>
                            <td>{campaign.title}</td>
                            <td>{campaign.genre}</td>
                            <td>{campaign.description}</td>
                            <td>{campaign.rulebook}</td>
                            <td>{campaign.campaign_email}</td>
                            {/* <td>{campaign.users}</td> */}
                        </tr>
                    </tbody> :'THERE IS NOTHING HERE'}
                </table>
                <h2>Campaign Events</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Event Name</th>
                            <th>Venue Name</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Participants</th>
                            <th>Associated Campaign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map((event) => {
                            return(
                                <tr key={event.event_id}>
                                    <td><Link to={`/campaigns/${campaignId}/${event.event_id}/ParticipantForm`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            Register for Adventure
                                        </button>
                                    </Link></td>
                                    <td>{event.eventname}</td>
                                    <td>{event.venuename}</td>
                                    <td>{event.address}</td>
                                    <td>{event.date}</td>
                                    {/* <td>{event.participants}</td> */}
                                    <td>{event.campaign_id}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}


export default CampaignDetail

// import React from 'react'
// import { useToken } from './AppAuth'


// const CampaignList = () => {
//     const []
// class CampaignList extends React.Component {
//     state = {
//         campaigns: [],
//     }

//     // async getToken() {
//     //     const url = `${process.env.REACT_APP_USERS_API_HOST}/token`
//     //     const response = await fetch(url, {
//     //         method: "get",
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             Authorization: `Bearer ${useToken}` },
//     //     });
//     // }

//     async getCampaign() {
//         const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns`
//         const response = await fetch(url);
//         try {
//             if (response.ok) {
//                 const data = await response.json()
//                 const campaigns = data.campaigns;
//                 this.setState({
//                     campaigns : data.campaigns,
//                 });
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     }
//     async componentDidMount() {
//         this.getCampaign();
//     }

//     render(){
//     return(
//         <div className="container-fluid">
//             <h1>Campaign List</h1>
//             <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Genre</th>
//                             <th>Description</th>
//                             <th>Rulebook</th>
//                             <th>Campaign Contact Email</th>
//                             <th>Users</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state?.campaigns?.map((campaign) => {
//                             return(
//                                 <tr key={campaign.campaign_id}>
//                                     <td>{campaign.title}</td>
//                                     <td>{campaign.genre}</td>
//                                     <td>{campaign.description}</td>
//                                     <td>{campaign.rulebook}</td>
//                                     <td>{campaign.campaign_email}</td>
//                                     <td>{campaign.users}</td>
//                                     {/* <td><img src={campaigns.picture_url} className='img-thumbnail' width="300px" height="300px"/></td> */}
//                               </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//         </div>
//     )
// }
// }

// export default CampaignList
