import React from 'react'

class UserList extends React.Component {

    async componentDidMount() {
        const url = '${process.env.REACT_APP_API}/monomyth/users'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            this.setState({models : data.models})
        }
    }


    render(){
    return(
        <div className="container-fluid">
            <h1>User List</h1>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state?.users?.map(users => {
                            return(
                                <tr key={users.user_id}>
                                    <td>{users.email}</td>
                                    <td>{users.role}</td>
                                    {/* <td><img src={users.picture_url} className='img-thumbnail' width="300px" height="300px"/></td> */}
                              </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}
}

export default UserList
