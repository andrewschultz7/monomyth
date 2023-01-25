import React, { useState, useEffect } from 'react'
import { useAuthContext } from './AppAuth'
import { Link, useParams } from "react-router-dom";

const CampaignDetail = () => {
    const [campaign, setCampaign] = useState([]);
    const { token } = useAuthContext();
    const { campaignId } = useParams();
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState();
    const [user, setUser] = useState();
    const [value, setValue] = useState();
    const [deleted, setDeleted] = useState(false);
    const userId = token.account.user_id
    let e = 0;
    // const tokenDict = {headers: { Authorization: `Bearer ${token.access_token}` },
    //                 }
    console.log(" BEFORE TOKEN DICT", token)
    // const tokenDict = {headers: { Authorization: `Bearer ${token.access_token}` }}
    console.log(" AFTER TOKEN DICT")



    useEffect(()=> {
        Promise.all([
            fetch(`${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/`, {headers: { Authorization: `Bearer ${token.access_token}` }}),
            fetch(`${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/eventlist`, {headers: { Authorization: `Bearer ${token.access_token}` }}),
            fetch(`${process.env.REACT_APP_CAMPAIGNS_API_HOST}/events/participants/`, {headers: { Authorization: `Bearer ${token.access_token}` }}),
            console.log("Event", events)
        ])
            .then(([resCampaigns, resEvents, resParticipants]) =>
                Promise.all([resCampaigns.json(), resEvents.json(), resParticipants.json()])
            )
            .then(([dataCampaigns, dataEvents, dataParticipants]) => {
                setCampaign(dataCampaigns);
                setEvents(dataEvents);
                setParticipants(dataParticipants);
                setDeleted(false)
            });
    },[deleted])

    // useEffect(() => {
    //     async function getCampaign() {
    //         console.log("campaign AAAAAAAAAAAAA", campaign)
    //         console.log("before url BBBBBBBBBBBBB", campaignId)
    //         console.log("Token TTTTTTTTTTT", token)
    //         const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/`;
    //         if (token) {
    //             const response = await fetch(url, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //                 });
    //             if (response.ok) {
    //             const data = await response.json();
    //             console.log("campaigndetails ",data )
    //             console.log("campaignuserid ",token.account.user_id)
    //             setCampaign(data);
    //             }
    //         }
    //     }
    //     getCampaign();

    //     async function getEvent() {
    //         const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/eventlist`;
    //         if (token) {
    //             const response = await fetch(url, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //                 });
    //             if (response.ok) {
    //             const data = await response.json();
    //             console.log("eventdetails ",data )
    //             console.log("eventuserid ",token.account.user_id)
    //             console.log("gamemasterid ",token.account.gamemaster_id)
    //             setEvents(data);
    //             }
    //         }
    //         else {
    //             console.log("Hello Event List")
    //         }
    //     }
    //     getEvent();

    //     async function getParticipant() {
    //         console.log("Beginning of participants ZZZZZZZZZZ")
    //         const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/events/participants`;
    //         if (token) {
    //             const response = await fetch(url, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log("participants ",data)
    //             setParticipants(data);
    //             }
    //         }
    //         else {
    //             console.log("no partcipants")
    //         }
    //     }
    //     getParticipant();

    // }, [token])

    const deleteEvent = async (event_id) => {
        let data = event_id
        console.log('FIRING DELETE EVENT : ', data, campaignId)
        const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/events/${data}`;
        const fetchConfig = {
        method: 'delete',
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type" : "application/json"
        },
        credentials : "include"
    };
    await fetch(url, fetchConfig)
    .then(response => response.json())
    .then(() => {
    })
    .catch(e => console.log(`error: `, e));
    setDeleted(true);
    // window.location.reload();

}


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
                            {console.log("Before Token", token.account.user_id, campaign.gamemaster_id)}
                            <td>{token.account.user_id===campaign.gamemaster_id
                                    ?
                                <Link to={`/Campaigns/${campaignId}/EventForm`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            CREATE EVENT
                                        </button>
                                    </Link>:"   "
                                         }
                                    </td>
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
                            {/* <th>Participants</th> */}
                            {/* <th>Associated Campaign</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map((event) => {
                            return(
                                <tr key={event.event_id}>
                                    <td>
                                        {console.log("event CCCCCCCCCCC", event.event_id, participants.event_id, event.event_id==participants.event_id)}
                                    {/* {participants.event_id!==event.event_id
                                    ?'': */}
                                        {participants.event_id!==event.event_id
                                    ?
                                        <Link to={`/campaigns/${campaignId}/${event.event_id}/participantform`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            Register for Adventure
                                        </button>
                                    </Link>
                                    :"REGISTERED"
                                         }
                                    </td>
                                    <td>{event.eventname}</td>
                                    <td>{event.venuename}</td>
                                    <td>{event.address}</td>
                                    <td>{event.date}</td>
                                    <td> {userId===campaign.gamemaster_id
                                    ?
                                       <Link to={`/Campaigns/${campaign.campaign_id}/${event.event_id}/edit/`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            EDIT
                                        </button>
                                    </Link>
                                         :"   "
                                         }
                                    </td>
                                     <td> {userId===campaign.gamemaster_id
                                    ?
                                        <button className="btn btn-outline-dark fw-bold" value={event.event_id} onClick=
                                        {e => deleteEvent(e.target.value)}>
                                            DELETE
                                        </button>
                                        :"   "
                                         }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}


export default CampaignDetail
