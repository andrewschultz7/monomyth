import React, { useState, useEffect } from "react";
import { useAuthContext } from "./AppAuth";
import { Link } from "react-router-dom";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { token } = useAuthContext();
  const [deleted, setDeleted] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getCampaign() {
      const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns`;
      if (token) {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        try {
          if (response.ok) {
            const data = await response.json();
            setCampaigns(data);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
      }
    }
    if(token){
    getCampaign();
    }
  }, [ deleted, token]);

  useEffect(() => {
    async function getUserFetch() {
      setDeleted(false);
      const response = await fetch(
        `${process.env.REACT_APP_USERS_API_HOST}/token`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const userdata = await response.json();
        setUsers(userdata);
      }
    }
    if(token){
    getUserFetch();
    }
  }, [deleted, token]);

  const deleteCampaign = async (campaign_id) => {
    setDeleted(false);
    let data = campaign_id;
    const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaign_id}`;
    const fetchConfig = {
      method: "delete",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };
    const response =  await fetch(url, fetchConfig)
     if (response.ok) {
      response.json()
      setDeleted(true);
     }
  };

  return (
    <>
      <h2 className="text-center">Campaigns</h2>
      <div>
        {campaigns.map((campaign) => {
          return (
            <div
              className="card-img-bottom"
              style={{
                backgroundImage: `url(${campaign.picture_url})`,
                backgroundSize: "auto",
                opacity: 0.4,
                // height: "auto",
                color: "#f5f5f5",
              }}
            >
              <div
                key={campaign.campaign_id}
                className="mask"
              >
                <div className="mask">{campaign.genre}</div>
                <div className="mask">
                  <div>
                    <h5 className="mask">{campaign.title}</h5>
                    <p className="card-text">{campaign.description}</p>
                    <div className="card-text">{campaign.campaign_email}</div>
                    <Link to={`/campaigns/${campaign.campaign_id}`}>
                      <button className="btn btn-outline-light fw-bold bg-dark">
                        DETAILS
                      </button>
                    </Link>
                    {users?.account.user_id === campaign.gamemaster_id ? (
                      <Link to={`/campaigns/${campaign.campaign_id}/edit`}>
                        <button className="card-text btn btn-outline-light fw-bold bg-dark">
                          EDIT
                        </button>
                      </Link>
                    ) : (
                      "   "
                    )}
                    {users?.account.user_id === campaign.gamemaster_id ? (
                      <button
                        className="card-text btn btn-outline-light fw-bold bg-dark"
                        value={campaign.campaign_id}
                        onClick={(e) => deleteCampaign(e.target.value)}
                      >
                        DELETE
                      </button>
                    ) : (
                      "   "
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CampaignList;
