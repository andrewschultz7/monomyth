import React from 'react'

class ParticipantList extends React.Component {

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
            <h1>Participant List</h1>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Character</th>
                            <th>Email</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state?.participants?.map(participants => {
                            return(
                                <tr key={participants.participant_id}>
                                    <td>{participants.character}</td>
                                    <td>{participants.email}</td>
                                    <td>{participants.event}</td>
                                    {/* <td><img src={participants.picture_url} className='img-thumbnail' width="300px" height="300px"/></td> */}
                              </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}
}

export default ParticipantList
