
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from "reactstrap"
import { Button } from "reactstrap";
import axios from "axios";
import CryptoJS from 'crypto-js';
import validation from '../../Validations/Image.js';
import validationnew from '../../Validations/Field.js';


const Bcategory = () => {

const [message, setMessage] = useState("");
const [messageerror, setMessageerror] = useState("");

const [isSubmitting, setIsSubmitting] = useState(false);

const [errors, setErrors] = useState({});
const [errorsnew, setErrorsnew] = useState({});
const [errorsnew1, setErrorsnew1] = useState({});

const [sno, setSno] = useState("");
const [title, setTitle] = useState("");
const [values, setValues] = useState({
  image1: null, 
});

const [clients, setClients] = useState([]);

const fetchClients = () => {
  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/blogcategories')
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
  setErrors(validation(values));
  setErrorsnew(validationnew(sno));
  setErrorsnew1(validationnew(title));

  if (values.image1) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('image1', values.image1);
    formData.append('sno', sno);
    formData.append('title', title);

    axios.post('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/uploadblogcategory', formData)
      .then(res => {
        if (res.data === "Success") {
          setMessage("Operation was Successful! Uploaded successfully");
          setMessageerror("");
          setSno(""); // Reset Serial Number
          setTitle("");
          setValues({ image1: null }); // Reset File Input
          setIsSubmitting(false); 
          event.target.reset();
          fetchClients();
        }
      })
      .catch(err => {
        if (err.response && err.response.data.error === "A record with this title already exists!") {
          setMessageerror("Error: The title already exists. Please use a different one.");
        } else {
          setMessageerror("An error occurred! Please recheck or try again.");
        }
        setMessage("");
        setIsSubmitting(false);
      });
  } else {
    setErrors(prev => ({
      ...prev,
      image1: !values.image1 ? "Please select a valid Image" : "",
    }));
  }
};
   
const handleDelete = (clientId) => {
  // Make an API call to delete the client
  axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deleteblogcategory/${clientId}`)
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
                                   <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet'}}>Dashboard</NavLink> | Blog Categories
                               </p>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
      <div className="auth-left py-32 px-24 d-flex flex-column" style={{background:"none",width:"auto"}}>
                    <div className="max-w-464-px mx-auto w-100">
                    <div>
                           
                               <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>A. Create New Category</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following form to add a new blog category to the website.<br/> <b>Recommended Resolution: 500 X 500</b>
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
                                      {errorsnew.sno && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsnew.sno}</span>}
                                 </div>
                                 <div  style={{marginTop:"15px"}}>

<input
    onChange={(e) => setTitle(e.target.value)}
type="text"
id="title"
name="title"
value={title}
placeholder="Enter Category Title"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsnew1.title && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsnew1.title}</span>}
</div>
                               <div style={{marginTop:"15px"}}>
                      <input onChange={(e) => handleFileChange(e, 1)}
                        type="file"
                        id="image1"
                        name="image1"
                        accept="image/*" 
                       className="form-control h-56-px bg-neutral-50 radius-12"
                      />
                      {errors.image1 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errors.image1}</span>}
                    </div>
                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                        {isSubmitting ? 'Please Wait...' : 'Create Category'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                              
                           </div>
                    </div>
                </div>
                   <div className="auth-right py-32 px-24 d-flex flex-column">
                       <div className="max-w-464-px mx-auto w-100">
                           <div>
                               
                           <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>B. Manage Existing Categories</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following modify / remove listed categories.
                               </p>
                               <table className="table bordered-table sm-table mb-0">
                            <thead>
                                        <tr>
                                        <th scope="col">Id</th>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
  <tbody>
    {clients.map(client => (
      <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Id}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Sno}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333" }}>{client.Named}<br/> <img src={client.Path1} alt="Not found" style={{ width: "150px", height: "auto", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} /></td>
      
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
               </section>
     
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default Bcategory