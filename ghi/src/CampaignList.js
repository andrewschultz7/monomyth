import React from 'react'

class CampaignList extends React.Component {

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
            <h1>Campaign List</h1>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Description</th>
                            <th>Rulebook</th>
                            <th>Campaign Contact Email</th>
                            <th>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state?.campaigns?.map(campaigns => {
                            return(
                                <tr key={campaigns.campaign_id}>
                                    <td>{campaigns.title}</td>
                                    <td>{campaigns.genre}</td>
                                    <td>{campaigns.description}</td>
                                    <td>{campaigns.rulebook}</td>
                                    <td>{campaigns.campaign_email}</td>
                                    <td>{campaigns.users}</td>
                                    {/* <td><img src={campaigns.picture_url} className='img-thumbnail' width="300px" height="300px"/></td> */}
                              </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}
}

export default CampaignList
