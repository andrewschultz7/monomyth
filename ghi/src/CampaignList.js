import React, { useState, useEffect } from 'react'
import { useAuthContext } from './AppAuth'
import { Link } from "react-router-dom";


const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { token } = useAuthContext();
    // const [token, setToken] = useState([]);

    useEffect(() => {
        async function getCampaign() {
            const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/Campaigns`;
            if (token) {
                console.log("token exists")
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                    });
            // try {
                if (response.ok) {
                const data = await response.json();
                setCampaigns(data);
                }
            // } catch (e) {
            //     console.error(e);
            // }
            }
            else {
                console.log("HELLO")
            }
        }
        getCampaign();
    }, [token])

    return (
        <div className="container-fluid">
            <h1>Campaign List</h1>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Description</th>
                            <th>Rulebook</th>
                            <th>Campaign Contact Email</th>
                            <th>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns?.map((campaign) => {
                            return(
                                <tr key={campaign.campaign_id}>
                                    <td><Link to={`/Campaigns/${campaign.campaign_id}/`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            DETAILS
                                        </button>
                                    </Link></td>
                                    <td>{campaign.title}</td>
                                    <td>{campaign.genre}</td>
                                    <td>{campaign.description}</td>
                                    <td>{campaign.rulebook}</td>
                                    <td>{campaign.campaign_email}</td>
                                    <td>{campaign.users}</td>
                                    <td><Link to={`/Campaigns/${campaign.campaign_id}/edit/`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            EDIT
                                        </button>
                                    </Link></td>
                              </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}


export default CampaignList
