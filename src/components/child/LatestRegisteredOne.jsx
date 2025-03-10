import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios";

const LatestRegisteredOne = () => {
    const [clients, setClients] = useState([]);

const fetchClients = () => {
  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/astrologers')
    .then(response => {
      setClients(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

// Fetch clients on component mount
useEffect(() => {
  fetchClients();
}, []);
    return (
        <div className="col-xxl-12 col-xl-12">
            <div className="card h-100">
                <div className="card-body p-24">
                    <div className="d-flex flex-wrap align-items-center gap-1 justify-content-between mb-16">
                        <ul
                            className="nav border-gradient-tab nav-pills mb-0"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center active"
                                    id="pills-to-do-list-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-to-do-list"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-to-do-list"
                                    aria-selected="true"
                                >
                                     Appointments
                                    <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                                        00
                                    </span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center"
                                    id="pills-recent-leads-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-recent-leads"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-recent-leads"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Astrolgers
                                    <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                                        03
                                    </span>
                                </button>
                            </li>
                        </ul>
                        {/* <Link
                            to="#"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                        >
                            Create New
                            <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="icon"
                            />
                        </Link> */}
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-to-do-list"
                            role="tabpanel"
                            aria-labelledby="pills-to-do-list-tab"
                            tabIndex={0}
                        >
                            <div className="table-responsive scroll-sm">
                            
                                <table className="table bordered-table sm-table mb-0">
                                    <thead>
                                        <tr>
                                        <th scope="col">ID</th>
                                            <th scope="col">Booking Details</th>
                                            <th scope="col">Appointment Details</th>
                                            <th scope="col">Astrolger Details</th>
                                            <th scope="col" className="text-center">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="d-flex align-items-center" style={{width:"100%", textAlign:'center', backgroundColor:"#fafafa"}}>
                                                <img src='siteimages/calendar.jpeg' alt='' style={{margin:"auto", padding:"auto"}} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                          
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-recent-leads"
                            role="tabpanel"
                            aria-labelledby="pills-recent-leads-tab"
                            tabIndex={0}
                        >
                            <div className="table-responsive scroll-sm">
                            <table className="table bordered-table sm-table mb-0">
                            <thead>
                                        <tr>
                                        <th scope="col">Id</th>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Registered On</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Contact No</th>
                                            <th scope="col">Status</th>
                                            
                                        </tr>
                                    </thead>
  <tbody>
    {clients.map(client => (
      <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Id}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Sno}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}><div className="d-flex align-items-center">
                                                    <img
                                                        src="assets/images/users/user1.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0 fw-medium">
                                                        {client.Named}
                                                        </h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                        {client.Email}
                                                        </span>
                                                    </div>
                                                </div></td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Regdate}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Ctype}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Cno}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}><div className="d-flex align-items-center">
                                                
                                                <div className="flex-grow-1">
                                                    <h6 className="text-md mb-0 fw-medium">
                                                    {client.Astatus}
                                                    </h6>
                                                    <NavLink className="text-sm text-secondary-light fw-medium">
                                                        Manage Profile
                                                    </NavLink>
                                                </div>
                                            </div></td>
      </tr>
    ))}
  </tbody>
</table>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestRegisteredOne