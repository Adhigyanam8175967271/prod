import React, { useState, useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink, useParams } from 'react-router-dom'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const StudyMaterial = () => {
  const { clientId } = useParams();
  const [message, setMessage] = useState("");
  const [messageerror, setMessageerror] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const [errorsfield, setErrorsfield] = useState({});
  
  
  const [sno, setSno] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


const [pdfFile, setPdfFile] = useState(null);
  
const [clients, setClients] = useState([]);

const fetchClients = (clientId) => {
  axios.get(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/studymaterial/${clientId}`)
    .then(response => {
      setClients(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

useEffect(() => {
  if (clientId) {
    fetchClients(clientId);
  }
}, [clientId]);
  
  
const handleSubmit = (event) => {
  event.preventDefault();

  // Client-side validation
  const newErrors = {
    ...validationnew("sno", sno),
    ...validationnew("title", title),
    ...validationnew("description", description),
  };

  setErrorsfield(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  // Check PDF validity
  if (!pdfFile || pdfFile.type !== "application/pdf") {
    setMessageerror("Please upload a valid PDF file.");
    return;
  }

  setIsSubmitting(true);

  const formData = new FormData();
  formData.append("sno", sno);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("clientId", clientId);
  formData.append("pdf", pdfFile); // must match the multer field

  axios
    .post('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/createstudymaterial', formData)
    .then((res) => {
      if (res.data === "Success") {
        setMessage("Operation was Successful!");
        setMessageerror("");
        setSno("");
        setTitle("");
        setDescription("");
        setPdfFile(null);
        setIsSubmitting(false);
        fetchClients(clientId);
      } else {
        setMessageerror("Unexpected server response.");
        setIsSubmitting(false);
      }
    })
    .catch((err) => {
      const serverMessage =
        err.response?.data?.error || "An error occurred! Please try again.";
      console.error("Upload Error:", err);
      setMessageerror(serverMessage);
      setMessage("");
      setIsSubmitting(false);
    });
};
     
  const handleDelete = (clientId) => {
    // Make an API call to delete the client
    axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deletestudymaterial/${clientId}`)
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
        {/* Breadcrumb */}
         <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                           <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | <NavLink to="/dashboardcourses" style={{color:'blueviolet', textDecoration:"underline"}}>Courses</NavLink>  | Study Material
                                       </p>
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
                                                                            A. Add Study material
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
                                                                           B. Manage Existing 
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
                                                                   <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
     <div className="col-xxl-12 col-xl-12" style={{background:"none",width:"auto"}}>
         <div className="mx-auto w-100">
             <div>
           
                                           <p className="mb-32 text-secondary-light text-lg">
                                               <b>Use the following form</b><br/>to add a new study material to the selected course.
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
            
            <textarea
                onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="description"
            name="description"
            value={description}
            placeholder="Enter Description here"
                className="form-control bg-neutral-50 radius-12"
              style={{minHeight:"120px"}}
            />
             {errorsfield.description && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.description}</span>}
            </div>

           <div style={{ marginTop: "15px" }}>
  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setPdfFile(e.target.files[0])}
    className="form-control h-56-px bg-neutral-50 radius-12"
  />
</div>
                                          
                                <div>
                                                    <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                                    {isSubmitting ? 'Please Wait...' : 'Create New Record'}
                                                    </Button>
                                                    
                                                  </div>
                                                </form>
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
                                   <b>Use the following datalist</b><br/>to modify / remove listed study materials.
                               </p>
                              
 <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Display Details</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
  {clients.map(client => (
    <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Sno}</td>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}><b>{client.Title}</b><br/>{client.Qdesc}</td>

      <td style={{ padding: "10px" }}>
       <a
    href={client.Path1}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-info btn-small"
    style={{
      padding: "5px 10px",
      fontSize: "0.8rem",
      borderRadius: "5px",
      marginRight: "10px",
      textDecoration: "none",
      color: "white",
      backgroundColor: "#17a2b8",
      border: "none",
      cursor: "pointer"
    }}
  >
    View PDF
  </a>
        <Button 
          className="btn-danger btn-small"
          style={{ padding: "5px 10px", fontSize: "0.8rem", borderRadius: "5px", border: "none", cursor: "pointer", transition: "0.3s" }}
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

             </div></div></div>
                                                                      
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

export default StudyMaterial