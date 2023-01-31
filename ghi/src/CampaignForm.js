import React from "react";
import { useState } from "react";
import { useAuthContext } from "./AppAuth";
import { useNavigate } from "react-router-dom";


function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

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

function CampaignForm() {
  const { token } = useAuthContext();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rulebook, setRulebook] = useState("");
  const [campaign_email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [picture_url, setPictureURL] = useState("");
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};
    data.title = title;
    data.genre = genre;
    data.description = description;
    data.rulebook = rulebook;
    data.campaign_email = campaign_email;
    data.users = users;
    data.picture_url = picture_url;
    const campaignUrl = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    };
    const response = await fetch(campaignUrl, fetchConfig)
    if (response.ok) {
        await response.json()
        setTitle("");
        setGenre("");
        setRulebook("");
        setEmail("");
        setUsers("");
        setDescription("");
        setPictureURL("");
        navigate(`/campaignlist`);
      }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Create A Campaign</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <BootstrapInput
            id="title"
            placeholder="Your Campaign Title here"
            labelText="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <BootstrapInput
            id="genre"
            placeholder="Enter Genre"
            labelText="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            type="text"
          />
          <BootstrapInput
            id="rulebook"
            placeholder="Enter rulebook"
            labelText="rulebook"
            value={rulebook}
            onChange={(e) => setRulebook(e.target.value)}
            type="text"
          />
          <BootstrapInput
            id="email"
            placeholder="Enter Contact Email"
            labelText="email"
            value={campaign_email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <BootstrapInput
            id="detail"
            placeholder="Enter Campaign Details"
            labelText="detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
          <BootstrapInput
            id="picture_url"
            placeholder="Enter Picture URL"
            labelText="picture_url"
            value={picture_url}
            onChange={(e) => setPictureURL(e.target.value)}
            type="text"
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
}

export default CampaignForm;
