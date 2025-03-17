import React, { useState, useEffect } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import axios from "axios";
import * as XLSX from 'xlsx';

const Astrologers = () => {
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

  // Change page
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
    <MasterLayout>
      <p className="mb-12 text-secondary-light" style={{ fontSize: "15px" }}>
        <b>You are here</b>: <NavLink to="/dashboard" style={{ color: 'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Listed Astrologers
      </p>
      <div className="col-xxl-12 col-xl-12">
        <div className="card h-100">
          <div className="card-body p-24">
            <p className="mb-6" style={{ fontWeight: 'bold', fontSize: "18px" }}>Displaying All Astrologers</p>
            <p className="mb-8 text-secondary-light text-lg">
              Use the following table to view account information for listed astrologers.<br />
              <b>Please Note</b>: Passwords have been disabled from display due to privacy measures.
            </p>
            <Button color="primary" onClick={exportToExcel} style={{ marginBottom: "20px",backgroundColor:'#434342', borderColor:'#434342', float:'right' }}>Export to Excel</Button>
            {/* <NavLink color="primary" to="/dashboardacn" style={{ marginBottom: "20px",backgroundColor:'blue', borderColor:'blue', float:'right', padding: "0.5625rem 0.75rem", 
    fontSize: "1rem", 
    fontWeight: "500", borderRadius: "0.375rem", color:'white', marginRight:"10px" }}></NavLink> */}
                  <table className="table bordered-table sm-table mb-0">
                                               <thead>
                                                   <tr>
                                                       <th scope="col">ID</th>
                                                       <th scope="col">S No.</th>
                                                       <th scope="col">Full Name</th>
                                                       <th scope="col">Registered On</th>
                                                       <th scope="col">Type</th>
                                                       <th scope="col">Verification Status</th>
                                                       <th scope="col">Network Status</th>
                                                   </tr>
                                               </thead>
                                               <tbody>
                                                   {currentRecords.map(client => (
                                                       <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                                                           <td style={{ padding: "10px" }}>{client.Id}</td>
                                                           <td style={{ padding: "10px" }}>{client.Sno}</td>
                                                           <td style={{ padding: "10px" }}>
                                                               <div className="d-flex align-items-center">
                                                               <img 
    src={client.Path1 && client.Path1.trim() !== "" ? client.Path1 : "siteimages/favicon.png"} 
    alt="Profile"
    className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden" 
/>
                                                                   <div className="flex-grow-1">
                                                                       <h6 className="text-md mb-0 fw-medium">{client.Named}</h6>
                                                                       <span className="text-sm text-secondary-light fw-medium">{client.Email}<br/>91-{client.Cno} - <b>{client.Gender}</b></span>
                                                                   </div>
                                                               </div>
                                                           </td>
                                                           <td style={{ padding: "10px" }}>{client.Regdate}</td>
                                                           <td style={{ padding: "10px" }}>{client.Ctype}</td>
                                                           <td style={{ padding: "10px" }}><b>Email</b>: {client.Vemail}<br/><b>Contact</b>: {client.Vnumber}</td>
                                                           <td style={{ padding: "10px" }}>
                                                               <div className="d-flex align-items-center">
                                                                   <div className="flex-grow-1">
                                                                       <h6 className="text-md mb-0 fw-medium">{client.Astatus}</h6>
                                                                       <NavLink className="text-sm text-secondary-light fw-medium" style={{color:'blueviolet'}}>
                                                                           Manage
                                                                       </NavLink>
                                                                   </div>
                                                               </div>
                                                           </td>
                                                       </tr>
                                                   ))}
                                               </tbody>
                                           </table>

            {/* Pagination Controls */}
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <Button color="secondary" onClick={prevPage} disabled={currentPage === 1} style={{ marginRight: "10px" }}>
                Previous
              </Button>
              <span style={{padding:"0.5625rem 0.75rem", fontWeight:'bold'}}>Page {currentPage} of {totalPages}</span>
              <Button color="secondary" onClick={nextPage} disabled={currentPage === totalPages} style={{ marginLeft: "10px" }}>
                Next
              </Button>
            </div>
            
          </div>
        </div>
      </div>
      <BlankPageLayer />
    </MasterLayout>
  );
};

export default Astrologers;