import React, { useState, useEffect } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import axios from "axios";
import * as XLSX from 'xlsx';

const Userdata = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/customers')
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "UsersData");
    XLSX.writeFile(workbook, "User_Registration_Data.xlsx");
  };

  return (
    <MasterLayout>
      <p className="mb-12 text-secondary-light" style={{ fontSize: "15px" }}>
        <b>You are here</b>: <NavLink to="/dashboard" style={{ color: 'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Registered Users
      </p>
      <div className="col-xxl-12 col-xl-12">
        <div className="card h-100">
          <div className="card-body p-24">
            <p className="mb-6" style={{ fontWeight: 'bold', fontSize: "18px" }}>User Registration Data</p>
            <p className="mb-8 text-secondary-light text-lg">
              Use the following table to view account information for your registered users.<br />
              <b>Please Note</b>: Passwords have been disabled from display due to privacy measures.
            </p>
            <Button color="primary" onClick={exportToExcel} style={{ marginBottom: "20px",backgroundColor:'#434342', borderColor:'#434342', float:'right' }}>Export to Excel</Button>
            <div style={{ overflowX: "auto", width: "100%" }}>
            <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
              <thead>
                <tr>
                <th>UID</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Contact No</th>
                  <th>Registered On</th>
                  <th>Reg. Mode</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map(client => (
                  <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                  <td style={{ padding: "10px" }}>{client.Id}</td>
                    <td style={{ padding: "10px" }}>{client.Named}</td>
                    <td style={{ padding: "10px" }}>{client.Email}</td>
                    <td style={{ padding: "10px" }}>91-{client.Cno}</td>
                    <td style={{ padding: "10px" }}>{client.Jdate}</td>
                    <td style={{ padding: "10px" }}>{client.Regmode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
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

export default Userdata;