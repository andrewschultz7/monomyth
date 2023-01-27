import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "./AppAuth";

function BootstrapInput(props2) {
  const { id, placeholder, labelText, value, onChange, type } = props2;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function CampaignEdit(props) {
  const { campaignId } = useParams();
  const { token } = useAuthContext();
  const { token: tokenState, setToken } = props;
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rulebook, setRulebook] = useState("");
  const [campaign_email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [campaign, setCampaign] = useState("");
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch(
        `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ),
    ])
      .then(([resCamp]) => Promise.all([resCamp.json()]))
      .then(([dataCamp]) => {
        setCampaign(dataCamp);
      });
  }, [tokenState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {};

    data.campaign_id = { campaignId };
    console.log("Title ", title);
    if (title === "") {
      data.title = campaign.title;
    } else {
      data.title = title;
    }
    console.log("Title SECOND ", data.title);
    if (genre === "") {
      data.genre = campaign.genre;
    } else {
      data.genre = genre;
    }

    if (description === "") {
      data.description = campaign.description;
    } else {
      data.description = description;
    }

    if (rulebook === "") {
      data.rulebook = campaign.rulebook;
    } else {
      data.rulebook = rulebook;
    }

    if (campaign_email === "") {
      data.campaign_email = campaign.campaign_email;
    } else {
      data.campaign_email = campaign_email;
    }

    if (users === "") {
      data.users = campaign.users;
    } else {
      data.users = users;
    }


    console.log("campaign edit ", campaign);
    const campaignUrl = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    await fetch(campaignUrl, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setTitle("");
        setGenre("");
        setDescription("");
        setRulebook("");
        setEmail("");
        setUsers("");
      })
      .catch((e) => console.log(`error: `, e));
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Edit A Campaign</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <BootstrapInput
            id="title"
            placeholder={campaign.title}
            labelText="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <BootstrapInput
            id="genre"
            placeholder={campaign.genre}
            labelText="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            type="text"
          />
          <BootstrapInput
            id="rulebook"
            placeholder={campaign.rulebook}
            labelText="rulebook"
            value={rulebook}
            onChange={(e) => setRulebook(e.target.value)}
            type="text"
          />
          <BootstrapInput
            id="email"
            placeholder={campaign.campaign_email}
            labelText="email"
            value={campaign_email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <BootstrapInput
            id="detail"
            placeholder={campaign.description}
            labelText="detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            Edit Campaign
          </button>
        </form>
      </div>
    </div>
  );
}

export default CampaignEdit;
