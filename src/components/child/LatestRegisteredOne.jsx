import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import * as XLSX from 'xlsx';

const LatestRegisteredOne = () => {
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/astrologers')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = clients.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(clients.length / recordsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Export data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(clients);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "AstrologersData");
        XLSX.writeFile(workbook, "Astrologers_Data.xlsx");
    };

    return (
        <div className="col-xxl-12 col-xl-12">
            <div className="card h-100">
                <div className="card-body p-24">
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-16">
                        <ul className="nav border-gradient-tab nav-pills mb-0" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link d-flex align-items-center active"
                                    id="pills-to-do-list-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-to-do-list" type="button"
                                    role="tab" aria-controls="pills-to-do-list" aria-selected="true">
                                    Astrologers
                                    <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                                        03
                                    </span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link d-flex align-items-center"
                                    id="pills-recent-leads-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-recent-leads" type="button"
                                    role="tab" aria-controls="pills-recent-leads" aria-selected="false">
                                    Appointments
                                    <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                                        00
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-to-do-list"
                            role="tabpanel" aria-labelledby="pills-to-do-list-tab">
                            <div className="table-responsive scroll-sm">
                                <table className="table bordered-table sm-table mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Registered On</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Contact No</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRecords.map(client => (
                                            <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                                                <td style={{ padding: "10px" }}>{client.Id}</td>
                                                <td style={{ padding: "10px" }}>{client.Sno}</td>
                                                <td style={{ padding: "10px" }}>
                                                    <div className="d-flex align-items-center">
                                                        <img src="assets/images/users/user1.png" alt=""
                                                            className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden" />
                                                        <div className="flex-grow-1">
                                                            <h6 className="text-md mb-0 fw-medium">{client.Named}</h6>
                                                            <span className="text-sm text-secondary-light fw-medium">{client.Email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: "10px" }}>{client.Regdate}</td>
                                                <td style={{ padding: "10px" }}>{client.Ctype}</td>
                                                <td style={{ padding: "10px" }}>91-{client.Cno}</td>
                                                <td style={{ padding: "10px" }}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-grow-1">
                                                            <h6 className="text-md mb-0 fw-medium">{client.Astatus}</h6>
                                                            <NavLink className="text-sm text-secondary-light fw-medium" style={{color:'blueviolet'}}>
                                                                Manage Profile
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination Controls */}
                                <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                                    <button className="btn btn-secondary" onClick={prevPage} disabled={currentPage === 1} style={{ marginRight: "10px" }}>
                                        Previous
                                    </button>
                                    <span style={{padding:"0.5625rem 0.75rem", fontWeight:'bold'}}>Page {currentPage} of {totalPages}</span>
                                    <button className="btn btn-secondary" onClick={nextPage} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>
                                        Next
                                    </button>
                                </div>
                                {/* Export Button */}
                                <div style={{ marginTop: "10px", textAlign: "right" }}>
                                    <button className="btn btn-primary" onClick={exportToExcel} style={{ marginBottom: "20px",backgroundColor:'#434342', borderColor:'#434342', float:'right' }}>
                                        Export to Excel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-recent-leads" role="tabpanel"
                            aria-labelledby="pills-recent-leads-tab">
                            {/* You can add another table here if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestRegisteredOne;