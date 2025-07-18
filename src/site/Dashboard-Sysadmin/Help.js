import React, { useState, useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import { Button } from "reactstrap";
import axios from "axios";


const Help = () => {

  const [clients, setClients] = useState([]);
  const [clientsnew, setClientsnew] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [activeTicketId, setActiveTicketId] = useState(null);
const [closeReason, setCloseReason] = useState("");
  
  const fetchClients = () => {
    axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/helppending')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchClientsnew = () => {
    axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/helpclosed')
      .then(response => {
        setClientsnew(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
    fetchClientsnew();
  }, []);
  
const submitCloseTicket = (clientId) => {
  if (!closeReason.trim()) {
    alert("Please enter a reason before submitting.");
    return;
  }

  axios.post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/approvehelp", {
    id: clientId,
    reason: closeReason
  })
  .then(response => {
    if (response.data === "Success") {
      setClients(prev => prev.filter(client => client.id !== clientId));
      setActiveTicketId(null);
      setCloseReason("");
    } else {
      alert("Failed to close ticket.");
    }
  })
  .catch(error => {
    console.error("Error closing ticket:", error);
    alert("Error occurred.");
  });
};

const filteredClients = clients.filter(client =>
  client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  client.contact.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredClientsNew = clientsnew.filter(client =>
  client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  client.contact.toLowerCase().includes(searchTerm.toLowerCase())
);
  
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
  

    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
         <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                           <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | User Support Tickets
                                       </p>
                                       <div className="mb-3">
  <input
    type="text"
    className="form-control" style={{backgroundColor:"white"}}
    placeholder="Search by Name, Email, or Contact..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
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
                                                                            A. Open Tickets
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
                                                                           B. Closed Tickets
                                                                       </button>
                                                                   </li>
                                                               </ul>
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
                                                                   <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
     <div className="col-xxl-12 col-xl-12" style={{background:"none",width:"auto"}}>
         <div className="mx-auto w-100">
            <div>


                               <p className="mb-32 text-secondary-light text-lg">
                                   <b>Use the following datalist</b><br/>to review all open User Support Tickets.
                               </p>
                               <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                            <th scope="col">Reg. Customer Details</th>
                                            <th scope="col">Ticket Details</th>
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
  <tbody>
   {filteredClients.map(client => (
      <tr key={client.id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor:"white" }}><b>Full Name</b>: {client.fullName}<br/><b>Email Address</b>: {client.email}<br/><b>Contact No</b>: {client.contact}<br/><b>Department</b>: {client.department}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor:"white" }}><b>Subject Of Concern</b>: {client.subject}<br/><span style={{maxWidth:"500px"}}>{client.message}</span><br/><b>Dated</b>: {formatDate(client.submitted_at)}</td>
        <td style={{ padding: "10px" }}>
          {activeTicketId === client.id ? (
  <div style={{ marginTop: "10px" }}>
    <input
      type="text"
      placeholder="Please Add Comment"
      value={closeReason}
      onChange={(e) => setCloseReason(e.target.value)}
      style={{ padding: "5px", fontSize: "0.8rem", marginRight: "10px", border:"solid silver thin" }}
    />
    <Button 
      className="btn-danger btn-small"
      style={{ padding: "5px 10px", fontSize: "0.8rem", borderRadius: "5px" }}
      onClick={() => submitCloseTicket(client.id)}
    >
      Confirm Close
    </Button>
  </div>
) : (
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
    onClick={() => setActiveTicketId(client.id)}
  >
    Close This Ticket
  </Button>
)}
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

             </div>


         </div>
     </div>
 </section>
                                                                      
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
                                                                   <div className="col-xxl-12 col-xl-12" style={{background:"none",width:"auto"}}>
         <div className="mx-auto w-100">
             <div>


                               <p className="mb-32 text-secondary-light text-lg">
                                   <b>Use the following datalist</b><br/>to review all closed User Support Tickets.
                               </p>
                               <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                            <th scope="col">Reg. Customer Details</th>
                                            <th scope="col">Ticket Details</th>
                                        </tr>
                                    </thead>
  <tbody>
   {filteredClientsNew.map(client => (
      <tr key={client.id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
               <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor:"white" }}><b>Full Name</b>: {client.fullName}<br/><b>Email Address</b>: {client.email}<br/><b>Contact No</b>: {client.contact}<br/><b>Department</b>: {client.department}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor:"white" }}><b>Subject Of Concern</b>: {client.subject}<br/><span style={{maxWidth:"500px"}}>{client.message}</span><br/><b>Dated</b>: {formatDate(client.submitted_at)}<br/><span style={{maxWidth:"500px"}}><b>Case Closed</b><br/>Comments: {client.CloseReason}</span></td>
      
      </tr>
    ))}
  </tbody>
</table>
</div>

             </div>
             </div></div>
                                                                      
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
  
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default Help