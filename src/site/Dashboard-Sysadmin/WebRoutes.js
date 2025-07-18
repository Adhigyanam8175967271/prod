
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const WebRoutes = () => {

const [message, setMessage] = useState("");
const [messageerror, setMessageerror] = useState("");

const [isSubmitting, setIsSubmitting] = useState(false);

const [errorsfield, setErrorsfield] = useState({});

const [sno, setSno] = useState("");
const [title, setTitle] = useState("");
const [qdesc, setQdesc] = useState("");
const [fdesc, setFdesc] = useState("");
const [values, setValues] = useState({
  image1: null, 
});

const [clients, setClients] = useState([]);

const fetchClients = () => {
  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/webroutes')
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

const handleFileChange = (event, imageNumber) => {
  const file = event.target.files[0];
  if (file) {
    setValues(prev => ({ ...prev, [`image${imageNumber}`]: file }));
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  // Validate all fields including file upload
  const newErrors = {
    ...validationnew("sno", sno),
    ...validationnew("title", title),
    ...validationnew("qdesc", qdesc),
    ...validationnew("fdesc", fdesc),
  };

  if (!values.image1) {
    newErrors.image1 = "Please select a valid image";
  }

  setErrorsfield(newErrors);

  // Prevent form submission if there are any validation errors
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  // Proceed with submission if validation passes
  setIsSubmitting(true);
  const formData = new FormData();
  formData.append('image1', values.image1);
  formData.append('sno', sno);
  formData.append('title', title);
  formData.append('qdesc', qdesc);
  formData.append('fdesc', fdesc);
  axios.post('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/uploadwebroute', formData)
    .then(res => {
      if (res.data === "Success") {
        setMessage("Operation was Successful! Uploaded successfully");
        setMessageerror("");
        setSno(""); // Reset Serial Number
        setTitle("");
        setQdesc("");
        setFdesc("");
        setValues({ image1: null }); // Reset File Input
        setIsSubmitting(false); 
        event.target.reset();
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
  axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deletewebroute/${clientId}`)
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
                                   <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Web Routes
                               </p>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
      <div className="auth-left py-32 px-24 d-flex flex-column" style={{background:"none",width:"auto"}}>
                    <div className="max-w-464-px mx-auto w-100">
                    <div>
                           
                               <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>A. Create New Route</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following form to add a new web route to the website. <b>Recommended Resolution: 500 X 350</b>
                               </p>
                               {message && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message}</p>}
                                 {messageerror && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror}</p>}
                               <form action="" onSubmit={handleSubmit}>
                               <div>

                                     <input
                                         onChange={(e) => setSno(e.target.value)}
                        type="number"
                        id="sno"
                        name="sno"
                        value={sno}
                        placeholder="Enter Serial No"
                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                       
                                     />
                                      {errorsfield.sno && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.sno}</span>}
                                 </div>
                                 <div  style={{marginTop:"15px"}}>

<input
    onChange={(e) => setTitle(e.target.value)}
type="text"
id="title"
name="title"
value={title}
placeholder="Enter Title"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsfield.title && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title}</span>}
</div>
<div  style={{marginTop:"15px"}}>

<input
    onChange={(e) => setQdesc(e.target.value)}
type="text"
id="qdesc"
name="qdesc"
value={qdesc}
placeholder="Enter Quick Info"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsfield.qdesc && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.qdesc}</span>}
</div>
 <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setFdesc(e.target.value)}
            type="text"
            id="fdesc"
            name="fdesc"
            value={fdesc}
            placeholder="Redirect URL"
                 className="form-control h-56-px bg-neutral-50 radius-12"
            />
             {errorsfield.fdesc && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.fdesc}</span>}
            </div>
                               <div style={{marginTop:"15px"}}>
                      <input onChange={(e) => handleFileChange(e, 1)}
                        type="file"
                        id="image1"
                        name="image1"
                        accept="image/*" 
                       className="form-control h-56-px bg-neutral-50 radius-12"
                      />
                      {errorsfield.image1 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.image1}</span>}
                    </div>
                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                        {isSubmitting ? 'Please Wait...' : 'Create Route'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                              
                           </div>
                    </div>
                </div>
                   <div className="auth-right py-32 px-24 d-flex flex-column">
                       <div className="max-w-464-px mx-auto w-100">
                           <div>
                               
                           <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>B. Manage Existing Routes</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following modify / remove listed web routes.
                               </p>
                               <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Route Title</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
  <tbody>
    {clients.map(client => (
      <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor:"white" }}>{client.Sno}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor:"white" }}>{client.Named}<br/> <img src={client.Path1} alt="Not found" style={{ width: "150px", height: "auto", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} /></td>
      
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
          </Button><br/>
          <Button 
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

export default WebRoutes