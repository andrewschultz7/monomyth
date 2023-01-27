import React from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuthContext } from "./AppAuth";


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

function ParticipantForm() {
  const [character, setCharacter] = useState("");
  const [participants, setParticipants] = useState("");
  const { campaignId, eventId } = useParams();
  const { token } = useAuthContext();
  const location = useLocation();
  const pid  = location.state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    async function postParticipantFetch() {
      console.log(participants)
      let data = {};
      data.character = character;
      data.event_id = parseInt(eventId);
      data.campaign_id = parseInt(campaignId);
      if (pid) {
        let participantId = parseInt(pid.pid)
        const response = await fetch(
          `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/events/${eventId}/participants/${pid.pid}`,
          {
            method: "put",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        if (response.ok) {
        const participantdata = await response.json();
        setParticipants(participantdata);
      }
    }
       else {
      const response = await fetch(
        `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/events/${eventId}/participants`,
        {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      )
      if (response.ok) {
        const participantdata = await response.json();
        setParticipants(participantdata);
      }
    }};
    postParticipantFetch();
    navigate(`/campaigns/${campaignId}/`);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Participate in an Event!</h1>
        <form onSubmit={handleSubmit}>
          <BootstrapInput
            id="character"
            placeholder="Character Name"
            labelText="Your Character here"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            type="text"
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ParticipantForm;
