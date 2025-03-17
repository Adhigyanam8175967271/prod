import React, { useState, useEffect } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import axios from "axios";

const RegRequests = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/astrologerspending')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  

  return (
    <MasterLayout>
      <p className="mb-12 text-secondary-light" style={{ fontSize: "15px" }}>
        <b>You are here</b>: <NavLink to="/dashboard" style={{ color: 'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Registration Requests
      </p>
      <div className="col-xxl-12 col-xl-12">
        <div className="card h-100">
          <div className="card-body p-24">
            <p className="mb-6" style={{ fontWeight: 'bold', fontSize: "18px" }}>Pending Approvals - Astrolgers</p>
            <p className="mb-8 text-secondary-light text-lg">
              Use the following table to review list of pending requests.<br />
              <b>Please Note</b>: Passwords have been disabled from display due to privacy measures.
            </p>
            <div style={{ overflowX: "auto", width: "100%" }}>
                  <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                                               <thead>
                                                   <tr>
                                                       <th scope="col">ID</th>
                                                       <th scope="col">Details</th>
                                                       <th scope="col">Applied On</th>
                                                       <th scope="col">Type</th>
                                                       <th scope="col">Options</th>
                                                   </tr>
                                               </thead>
                                               <tbody>
                                                   {clients.map(client => (
                                                       <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                                                           <td style={{ padding: "10px" }}>{client.Id}</td>
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
                                                           <td style={{ padding: "10px" }}>
                                                               <div className="d-flex align-items-center">
                                                                   <div className="flex-grow-1">
                                                                        <Button 
                                                                                   className="btn-success btn-small" 
                                                                                   style={{
                                                                                     padding: "5px 10px", 
                                                                                     fontSize: "0.8rem", 
                                                                                     borderRadius: "5px", 
                                                                                     border: "none", 
                                                                                     cursor: "pointer",
                                                                                     transition: "0.3s"
                                                                                   }} 
                                                                                  >
                                                                                   Review Profile
                                                                                 </Button><br/>
                                                                                 
                                                                   </div>
                                                               </div>
                                                           </td>
                                                       </tr>
                                                   ))}
                                               </tbody>
                                           </table>
</div>
           
            
          </div>
        </div>
      </div>
      <BlankPageLayer />
    </MasterLayout>
  );
};

export default RegRequests;