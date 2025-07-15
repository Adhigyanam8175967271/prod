import React, { useState, useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const Promocodesuser = () => {

  const [message, setMessage] = useState("");
  const [messageerror, setMessageerror] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const [errorsfield, setErrorsfield] = useState({});
  
  
  const [sno, setSno] = useState("");
  const [snonew, setSnonew] = useState("");
  const [title, setTitle] = useState("");
  const [dated, setDated] = useState("");
 
  const [clients, setClients] = useState([]);
  
  const fetchClients = () => {
    axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/promocodesuser')
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

  const newErrors = {
    ...validationnew("sno", sno),
    ...validationnew("title", title),
  };

  // Only validate snonew if it's provided
  if (snonew && snonew.trim() !== "") {
    Object.assign(newErrors, validationnew("snonew", snonew));
  }

  setErrorsfield(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setIsSubmitting(true);

  axios
    .post(
      "https://adhigyanam-e92bf1bbbdb1.herokuapp.com/createpromouser",
      {
        sno,
        title,
        dated,
        snonew: snonew && snonew.trim() !== "" ? snonew : null, // send null if blank
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      if (res.data === "Success") {
        setMessage("Operation was Successful!");
        setMessageerror("");
        setSno("");
        setSnonew("");
        setTitle("");
        setDated("");
        fetchClients();
      }
    })
    .catch((err) => {
      if (err.response && err.response.status === 409) {
        setMessageerror(err.response.data.error || "Duplicate entry. Try another.");
      } else {
        setMessageerror("An error occurred! Please try again.");
      }
      setMessage("");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};
     
  const handleDelete = (clientId) => {
    // Make an API call to delete the client
    axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deletepromouser/${clientId}`)
      .then(response => {
        // If deletion is successful, update the clients array to remove the deleted client
        setClients(clients.filter(client => client.Id !== clientId));
      })
      .catch(error => {
        console.error('Error deleting Promocode:', error);
        // Handle error, such as displaying an error message
      });
  };
  
 const today = new Date().toISOString().split("T")[0];
    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
         <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                           <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Promocodes
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
                                                                            A. Add New Coupon
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
                                                                           B. Review Existing
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
                                               <b>Use the following form</b> to add a new promocode to the website.
                                           </p>
                                           {message && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message}</p>}
                                             {messageerror && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror}</p>}
                                           <form action="" onSubmit={handleSubmit}>
                                          


                                             <div>
            
            <input
                onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Enter Coupon Code"
                className="form-control h-56-px bg-neutral-50 radius-12"
               style={{textTransform:"uppercase"}}
            />
             {errorsfield.title && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title}</span>}
            </div>
             <div style={{marginTop:"15px"}}>
            
                                                 <input
                                                     onChange={(e) => setSno(e.target.value)}
                                    type="number"
                                    id="sno"
                                    name="sno"
                                    value={sno}
                                    placeholder="Enter Discount %"
                                                     className="form-control h-56-px bg-neutral-50 radius-12"
                                                   
                                                 />
                                                  {errorsfield.sno && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.sno}</span>}
                                             </div>
                                              <div style={{marginTop:"15px"}}>
            
                                                 <input
                                                     onChange={(e) => setSnonew(e.target.value)}
                                    type="number"
                                    id="snonew"
                                    name="snonew"
                                    value={snonew}
                                    placeholder="Enter User UID"
                                                     className="form-control h-56-px bg-neutral-50 radius-12"
                                                   
                                                 />
                                             </div>
            <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setDated(e.target.value)}
            type="date"
            id="dated"
            name="dated"
            value={dated}
            min={today}
            placeholder="Select Expiry Date [Optional]"
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
                                   <b>Use the following datalist</b> to review / remove listed promocodes.
                               </p>
                              
 <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                        
                                            <th scope="col">Coupon</th>
                                            <th scope="col">Discount %</th>
                                            <th scope="col">Expiry</th>
                                             <th scope="col">User Specifics</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
  {clients.map(client => (
    <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
    
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white", textTransform:"uppercase" }}>{client.Code}</td>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Discount}</td>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Expiry}</td>
        <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}><b>UID: {client.Userid}</b> / {client.Usagep} / {client.Orderid}</td>
      <td style={{ padding: "10px" }}>
        
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

export default Promocodesuser