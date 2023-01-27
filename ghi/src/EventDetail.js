import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EventDetail = (props) => {
  const { campaignId } = useParams();
  const { token } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvent() {
      const url = `${process.env.REACT_APP_CAMPAIGNS_API_HOST}/events`;
      if (token) {
        console.log("token exists");
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } else {
        console.log("Hello Event List");
      }
    }
    if(token){
    getEvent();
    }
  }, [token]);

  return (
    <div className="container-fluid">
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
            return (
              <tr key={event.event_id}>
                <td>
                  <Link
                    to={`/campaigns/${campaignId}/${event.event_id}/participantform`}
                  >
                    <button className="btn btn-outline-dark fw-bold">
                      Register for Adventure
                    </button>
                  </Link>
                </td>
                <td>{event.eventname}</td>
                <td>{event.venuename}</td>
                <td>{event.address}</td>
                <td>{event.date}</td>
                <td>{event.campaign_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EventDetail;
