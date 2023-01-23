import React, { useState, useEffect } from 'react'
import { useAuthContext } from './AppAuth'
import { Link } from 'react-router-dom'


const EventList = () => {
    const [events, setEvents] = useState([]);
    const { token } = useAuthContext();

    useEffect(() => {
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

    return(
        <div className="container-fluid">
            <h1>Event List</h1>
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
                                    <td><Link to={`/events/${event.event_id}/`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            Register for Event!
                                        </button>
                                    </Link></td>
                                    <td>{event.eventname}</td>
                                    <td>{event.venuename}</td>
                                    <td>{event.address}</td>
                                    <td>{event.date}</td>
                                    <td>{event.participants}</td>
                                    <td>{event.campaign}</td>
                                        <td><Link to={`/Events/${event.event_id}/edit/`}>
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


export default EventList
