import React, { useState, useEffect } from "react";
import { useAuthContext, useToken } from "./AppAuth";
import { Link } from "react-router-dom";

const CampaignList = (props) => {
  const [campaigns, setCampaigns] = useState([]);
  const { token } = useAuthContext();
  const { token: tokenState, setToken } = props;

  useEffect(() => {
    setToken(token);
  }, [token]);

  useEffect(() => {
    console.log(token);
    async function getCampaign() {
      const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns`;
      if (token) {
        console.log("token exists ", token);
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
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
    getCampaign();
  }, [tokenState]);

  return (
    <>
      <h2 className="text-center">Campaigns</h2>
      <div>
        {campaigns.map((campaign) => {
          return (
            <div key={campaign.campaign_id} className="card">
              <div className="card-header">{campaign.genre}</div>
              <div className="card-body">
                <h5 className="card-title">{campaign.title}</h5>
                <p className="card-text">{campaign.description}</p>
                <Link to={`/campaigns/${campaign.campaign_id}`}>
                  <button className="btn btn-outline-dark fw-bold">
                    DETAILS
                  </button>
                </Link>
              </div>
              <div className="card-footer text-muted">
                {campaign.campaign_email}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CampaignList;
