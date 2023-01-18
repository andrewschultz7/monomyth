import React from 'react'

class EventList extends React.Component {

    async componentDidMount() {
        const url = `http://localhost:8100/api/models/`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            this.setState({models : data.models})
        }
    }


    render(){
    return(
        <div className="container-fluid">
            <h1>Event List</h1>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Venue Name</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Participants</th>
                            <th>Associated Campaign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state?.events?.map(events => {
                            return(
                                <tr key={events.event_id}>
                                    <td>{events.eventname}</td>
                                    <td>{events.venuename}</td>
                                    <td>{events.address}</td>
                                    <td>{events.date}</td>
                                    <td>{events.participants}</td>
                                    <td>{events.campaign}</td>
                                    {/* <td><img src={events.picture_url} className='img-thumbnail' width="300px" height="300px"/></td> */}
                              </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}
}

export default EventList
