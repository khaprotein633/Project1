import React from 'react'


const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "User" },
];
const Users = () => {

    return (
        <>
            
            <div className="container mt-4">
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a class="navbar-brand">Users List</a>
                <form class="d-flex">
                    <input class="form-control mr-sm-2 me-2" type="search" placeholder="Search" aria-label="Search" />   
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>

                <table className="table table-striped table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th> {/* Thêm cột cho hành động */}
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-warning me-2">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users
