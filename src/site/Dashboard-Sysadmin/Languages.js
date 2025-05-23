
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const Languages = () => {

const [message, setMessage] = useState("");
const [messageerror, setMessageerror] = useState("");

const [isSubmitting, setIsSubmitting] = useState(false);

const [errorsfield, setErrorsfield] = useState({});


const [title, setTitle] = useState("");


const [clients, setClients] = useState([]);

const fetchClients = () => {
  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/languages')
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



const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate fields
    const newErrors = validationnew("title", title);
    setErrorsfield(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    setIsSubmitting(true);
  
    axios.post('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/uploadlanguage', 
      { title }, // Sending plain JSON instead of FormData
      { headers: { "Content-Type": "application/json" } } // Explicitly set JSON headers
    )
      .then(res => {
        if (res.data === "Success") {
          setMessage("Operation was Successful! Uploaded successfully");
          setMessageerror("");
          setTitle("");
          setIsSubmitting(false);
          fetchClients();
        }
      })
      .catch(err => {
        setMessageerror("An error occurred! Please recheck or try again.");
        setMessage("");
        setIsSubmitting(false);
      });
  };
   
const handleDelete = (clientId) => {
  // Make an API call to delete the client
  axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deletelanguage/${clientId}`)
    .then(response => {
      // If deletion is successful, update the clients array to remove the deleted client
      setClients(clients.filter(client => client.Id !== clientId));
    })
    .catch(error => {
      console.error('Error deleting Category:', error);
      // Handle error, such as displaying an error message
    });
};


    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
      <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                   <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Languages
                               </p>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
      <div className="auth-left py-32 px-24 d-flex flex-column" style={{background:"none",width:"auto"}}>
                    <div className="max-w-464-px mx-auto w-100">
                    <div>
                           
                               <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>A. Create Language Selector</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following form to add a new language selector for astrologers.
                               </p>
                               {message && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message}</p>}
                                 {messageerror && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror}</p>}
                               <form action="" onSubmit={handleSubmit}>
                               
                                 <div  style={{marginTop:"15px"}}>

<input
    onChange={(e) => setTitle(e.target.value)}
type="text"
id="title"
name="title"
value={title}
placeholder="Enter Language Name"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsfield.title && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title}</span>}
</div>

 
                             
                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                        {isSubmitting ? 'Please Wait...' : 'Create Selector'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                              
                           </div>
                    </div>
                </div>
                   <div className="auth-right py-32 px-24 d-flex flex-column">
                       <div className="max-w-464-px mx-auto w-100">
                           <div>
                               
                           <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>B. Manage Listed Selectors</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following modify / remove listed selectors.
                               </p>
                               <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                       
                                           
                                            <th scope="col">Language</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
  <tbody>
    {clients.map(client => (
      <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
      
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor:"white" }}>{client.Named}</td>
      
        <td style={{ padding: "10px" }}>
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
            Manage
          </Button>
          <Button 
            className="btn-danger btn-small" 
            style={{
              padding: "5px 10px", 
              fontSize: "0.8rem", 
              borderRadius: "5px", 
              border: "none", 
              cursor: "pointer",
              transition: "0.3s",
              marginLeft:"5px"
            }} 
            onClick={() => {
              if (window.confirm("You are removing a record permanently! Are you sure you want to delete this record?")) {
                handleDelete(client.Id);
              }
            }}>
            Remove
          </Button>
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
     
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default Languages