import React, { useState, useEffect, useMemo } from "react";
import { useAuthContext, useToken } from "./AppAuth";
import { Link, useParams, useLocation } from "react-router-dom";

const CampaignDetail = (props) => {
  const [campaign, setCampaign] = useState([]);
  const { token } = useAuthContext();
  const { token: tokenState, setToken } = props;
  const { campaignId } = useParams();
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState();
  const [users, setUsers] = useState();
  const [deleted, setDeleted] = useState(false);
  const [pchange, setPchange] = useState();
  const location = useLocation();

  let e = 0;

  useEffect(() => {
    async function getParticipantFetch() {
      const response = await fetch(
        `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/events/participants`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );
      if (response.ok) {
        const participantdata = await response.json();
        console.log("participantdata ", participantdata);
        setParticipants(participantdata);
      }
    }
    getParticipantFetch();
  }, []);

  useEffect(() => {
    async function getUserFetch() {
      const response = await fetch(
        `${process.env.REACT_APP_USERS_API_HOST}/token`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );
      if (response.ok) {
        const userdata = await response.json();
        setUsers(userdata);
      }
    }
    getUserFetch();
  }, [deleted]);

  useEffect(() => {
    async function getCampaignFetch() {
      const response = await fetch(
        `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );
      if (response.ok) {
        const campaigndata = await response.json();
        setCampaign(campaigndata);
      }
    }
    getCampaignFetch();
  }, [deleted]);

  useEffect(() => {
    async function getEventFetch() {
      const response = await fetch(
        `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/eventlist`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );
      if (response.ok) {
        const eventdata = await response.json();
        setEvents(eventdata);
      }
    }
    getEventFetch();
  }, [deleted]);

  useEffect(() => {
    async function getParticipantFetch() {
      const response = await fetch(
        `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/events/participants`,
        {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        }
      );
      if (response.ok) {
        const participantdata = await response.json();
        console.log("participantdata2 ", participantdata);
        setParticipants(participantdata);
      }
    }
    getParticipantFetch();
  }, [deleted]);

  const deleteEvent = async (event_id) => {
    let data = event_id;
    const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/campaigns/${campaignId}/events/${data}`;
    const fetchConfig = {
      method: "delete",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    await fetch(url, fetchConfig)
      .then((response) => response.json())
      .then(() => {})
      .catch((e) => console.log(`error: `, e));
    setDeleted(true);
  };

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
        {campaign && users ? (
          <tbody>
            <tr key={campaign.campaign_id}>
              <td>{campaign.campaign_id}</td>
              <td>{campaign.title}</td>
              <td>{campaign.genre}</td>
              <td>{campaign.description}</td>
              <td>{campaign.rulebook}</td>
              <td>{campaign.campaign_email}</td>
              <td>
                {users?.account.user_id === campaign.gamemaster_id ? (
                  <Link to={`/Campaigns/${campaignId}/EventForm`}>
                    <button className="btn btn-outline-dark fw-bold">
                      CREATE EVENT
                    </button>
                  </Link>
                ) : (
                  "   "
                )}
              </td>
            </tr>
          </tbody>
        ) : (
          "THERE IS NOTHING HERE"
        )}
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
          </tr>
        </thead>
        {events ? (
          <tbody>
            {events?.map((event) => {
              return (
                <tr key={event.event_id}>
                  <td>
                    {" "}
                    {participants ? (
                      <>
                        {participants.event_id !== event.event_id ? (
                          <Link
                            to={`/campaigns/${campaignId}/${event.event_id}/participantform`}
                            state={{ pid: participants.participant_id }}
                          >
                            <button className="btn btn-outline-dark fw-bold">
                              Register for Adventure
                            </button>
                          </Link>
                        ) : (
                          "REGISTERED"
                        )}
                      </>
                    ) : (
                      <Link
                        to={`/campaigns/${campaignId}/${event.event_id}/participantform`}
                      >
                        <button className="btn btn-outline-dark fw-bold">
                          Register for Adventure
                        </button>
                      </Link>
                      // "second link"
                    )}
                  </td>
                  <td>{event.eventname}</td>
                  <td>{event.venuename}</td>
                  <td>{event.address}</td>
                  <td>{event.date}</td>
                  <td>
                    {" "}
                    {users?.account.user_id === campaign.gamemaster_id ? (
                      <Link
                        to={`/Campaigns/${campaign.campaign_id}/${event.event_id}/edit/`}
                      >
                        <button className="btn btn-outline-dark fw-bold">
                          EDIT
                        </button>
                      </Link>
                    ) : (
                      "   "
                    )}
                  </td>
                  <td>
                    {" "}
                    {users?.account.user_id === campaign.gamemaster_id ? (
                      <button
                        className="btn btn-outline-dark fw-bold"
                        value={event.event_id}
                        onClick={(e) => deleteEvent(e.target.value)}
                      >
                        DELETE
                      </button>
                    ) : (
                      "   "
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          "Nothing"
        )}
      </table>
    </div>
  );
};

export default CampaignDetail;
