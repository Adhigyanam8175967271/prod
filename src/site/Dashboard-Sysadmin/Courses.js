import React, { useState, useEffect } from 'react';
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";
import axios from "axios";

const Courses = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/courses')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (clientId) => {
  // Make an API call to delete the client
  axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deletecourse/${clientId}`)
    .then(response => {
      // If deletion is successful, update the clients array to remove the deleted client
      setClients(clients.filter(client => client.Id !== clientId));
    })
    .catch(error => {
      console.error('Error deleting Category:', error);
      // Handle error, such as displaying an error message
    });
};

 const navigate = useNavigate();

  const handleManage1 = (clientId) => {
    navigate(`/dashboardcurriculum/${clientId}`);
  };

  const handleManage2 = (clientId) => {
    navigate(`/dashboardstudymaterial/${clientId}`);
  };

  const handleManage3 = (clientId) => {
    navigate(`/dashboardvideo/${clientId}`);
  };

  const handleManage4 = (clientId) => {
    navigate(`/dashboardquestion/${clientId}`);
  };

   const handleManage5 = (clientId) => {
    navigate(`/dashboardvideourl/${clientId}`);
  };

  return (
    <MasterLayout>
      <p className="mb-12 text-secondary-light" style={{ fontSize: "15px" }}>
        <b>You are here</b>: <NavLink to="/dashboard" style={{ color: 'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Listed Courses
      </p>
      <div className="col-xxl-12 col-xl-12">
        <div className="card h-100">
          <div className="card-body p-24">
            <p className="mb-4" style={{ fontWeight: 'bold', fontSize: "18px" }}>Course Management Panel</p>
            <p className="mb-12 text-secondary-light text-lg">
              Use the following datalist to access features related to courses listed on the website.
            </p>
            <div style={{ overflowX: "auto", width: "100%" }}>
                  <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                                               <thead>
                                                   <tr>
                                                       <th scope="col">Listed Courses</th>
                                                       <th scope="col">Fee Structure</th>
                                                       <th scope="col">Management Options</th>
                                                   </tr>
                                               </thead>
                                               <tbody>
                                                   {clients.map(client => (
                                                       <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                                                 
                                                           <td style={{ padding: "10px" }}>
                                                               <div className="d-flex align-items-center">
                                                               <img 
    src={client.Path1 && client.Path1.trim() !== "" ? client.Path1 : "siteimages/favicon.png"} 
    alt="Profile"
    className="w-60-px h-60-px rounded-circle flex-shrink-0 me-12 overflow-hidden" 
/>
                                                                   <div className="flex-grow-1">
                                                                       <h6 className="text-md mb-4 fw-medium">#{client.Id} - {client.Title}</h6>
                                                                       <span className="text-sm text-secondary-light fw-medium"><b>Language</b>: {client.Lname} - <b>Validity</b>: {client.Validity} Days<br/><b>Educator</b>: {client.Ename}</span>
                                                                   </div>
                                                               </div>
                                                           </td>
                                                           <td className="text-sm text-secondary-light fw-medium" style={{ padding: "10px" }}><b>Course Fee</b>: {client.Price1} INR<br/><b>Add-On Fee</b>: {client.Price2} INR</td>
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
                                                                                     transition: "0.3s", marginBottom:"5px"
                                                                                   }} onClick={() => handleManage1(client.Id)}
                                                                                  >
                                                                                   Curriculum
                                                                                 </Button> <Button 
                                                                                   className="btn-success btn-small" 
                                                                                   style={{
                                                                                     padding: "5px 10px", 
                                                                                     fontSize: "0.8rem", 
                                                                                     borderRadius: "5px", 
                                                                                     border: "none", 
                                                                                     cursor: "pointer",
                                                                                     transition: "0.3s", marginBottom:"5px"
                                                                                   }} onClick={() => handleManage3(client.Id)}
                                                                                  >
                                                                                   Videos
                                                                                 </Button> <Button 
                                                                                   className="btn-success btn-small" 
                                                                                   style={{
                                                                                     padding: "5px 10px", 
                                                                                     fontSize: "0.8rem", 
                                                                                     borderRadius: "5px", 
                                                                                     border: "none", 
                                                                                     cursor: "pointer",
                                                                                     transition: "0.3s", marginBottom:"5px"
                                                                                   }} onClick={() => handleManage5(client.Id)}
                                                                                  >
                                                                                   URL Videos
                                                                                 </Button> <Button 
                                                                                   className="btn-success btn-small" 
                                                                                   style={{
                                                                                     padding: "5px 10px", 
                                                                                     fontSize: "0.8rem", 
                                                                                     borderRadius: "5px", 
                                                                                     border: "none", 
                                                                                     cursor: "pointer",
                                                                                     transition: "0.3s", marginBottom:"5px"
                                                                                   }} onClick={() => handleManage2(client.Id)}
                                                                                  >
                                                                                   Add-Ons
                                                                                 </Button><br/> <Button 
                                                                                   className="btn-success btn-small" 
                                                                                   style={{
                                                                                     padding: "5px 10px", 
                                                                                     fontSize: "0.8rem", 
                                                                                     borderRadius: "5px", 
                                                                                     border: "none", 
                                                                                     cursor: "pointer",
                                                                                     transition: "0.3s"
                                                                                   }} onClick={() => handleManage4(client.Id)}
                                                                                  >
                                                                                   Q & A
                                                                                 </Button> <Button 
                                                                                   className="btn-dark btn-small" 
                                                                                   style={{
                                                                                     padding: "5px 10px", 
                                                                                     fontSize: "0.8rem", 
                                                                                     borderRadius: "5px", 
                                                                                     border: "none", 
                                                                                     cursor: "pointer",
                                                                                     transition: "0.3s"
                                                                                   }} 
                                                                                  >
                                                                                   Manage
                                                                                 </Button> <Button 
                                                                                             className="btn-danger btn-small" 
                                                                                             style={{
                                                                                               padding: "5px 10px", 
                                                                                               fontSize: "0.8rem", 
                                                                                               borderRadius: "5px", 
                                                                                               border: "none", 
                                                                                               cursor: "pointer",
                                                                                               transition: "0.3s"
                                                                                             }} 
                                                                                             onClick={() => {
                                                                                               if (window.confirm("You are removing a record permanently! Are you sure you want to delete this record?")) {
                                                                                                 handleDelete(client.Id);
                                                                                               }
                                                                                             }}>
                                                                                             Remove
                                                                                           </Button>
                                                                                 
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

export default Courses;