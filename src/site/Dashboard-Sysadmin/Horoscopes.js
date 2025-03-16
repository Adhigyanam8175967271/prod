import React, { useState, useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const Horoscopes = () => {

  const [message, setMessage] = useState("");
  const [messageerror, setMessageerror] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const [errorsfield, setErrorsfield] = useState({});
  
  
  const [sno, setSno] = useState("");
  const [title, setTitle] = useState("");
  const [dated, setDated] = useState("");
  const [description, setDescription] = useState("");
  const [clientnew, setClientnew] = useState(""); 
  const [clientAid, setClientAid] = useState("");  // Stores Aid (Id)
  const [clientAname, setClientAname] = useState(""); // Stores Aname (Named)

  
  
  
  const [clients, setClients] = useState([]);
  
  const fetchClients = () => {
    axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/predictions')
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
        ...validationnew("dated", dated),
        ...validationnew("description", description),
    };

    // Dropdown Validation (Check if both Aid and Aname are selected)
  if (!clientAid || !clientAname) {
    newErrors.clientnew = "Please select a valid category";
  }

    setErrorsfield(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    axios.post(
        'https://adhigyanam-e92bf1bbbdb1.herokuapp.com/createprediction',
        { sno, title, dated, description, clientAid, clientAname },  // Sending as JSON
        { headers: { 'Content-Type': 'application/json' } } // Set JSON header
    )
    .then(res => {
        if (res.data === "Success") {
            setMessage("Operation was Successful!");
            setMessageerror("");
            setSno(""); 
            setTitle("");
            setDated("");
            setDescription("");
            setClientAid(""); // Reset Aid
            setClientAname(""); // Reset Aname
            setIsSubmitting(false);
            fetchClients();
        }
    })
    .catch(err => {  
        setMessageerror("An error occurred! Please try again.");
        setMessage("");
        setIsSubmitting(false);
    });
};
     
  const handleDelete = (clientId) => {
    // Make an API call to delete the client
    axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deleteprediction/${clientId}`)
      .then(response => {
        // If deletion is successful, update the clients array to remove the deleted client
        setClients(clients.filter(client => client.Id !== clientId));
      })
      .catch(error => {
        console.error('Error deleting Category:', error);
        // Handle error, such as displaying an error message
      });
  };
  
  const [options, setOptions] = useState([]);

useEffect(() => {

  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/horoscopecategories')
    .then(response => {
      setOptions(response.data.map(item => ({ value: item.Id, label: item.Named })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

   

}, []); 

const [filterDate, setFilterDate] = useState(""); 
const [filterCategory, setFilterCategory] = useState("");

// Function to filter displayed predictions
const filteredClients = clients.filter(client => {
  return (
    (!filterDate || client.Dated === filterDate) &&
    (!filterCategory || client.Hid.toString() === filterCategory)
  );
});

    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
         <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                           <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | <NavLink to="/dashboardhc" style={{color:'blueviolet', textDecoration:"underline"}}>Categories</NavLink>  | Predictions
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
                                                                            A. Add New Horoscope
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
                                               <b>Use the following form</b><br/>to add a new horoscope prediction assigned by date and category to the website.
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

<select
 id="clientnew"
 name="clientnew"
 className="form-control h-56-px bg-neutral-50 radius-12"
 onChange={(e) => {
   const selectedIndex = e.target.selectedIndex;
   const selectedAid = e.target.value; // Gets Aid (Id)
   const selectedAname = e.target.options[selectedIndex].getAttribute("data-name"); // Gets Named (Aname)
   
   setClientAid(selectedAid);
   setClientAname(selectedAname);
 }}
>
 <option value="">Select Horoscope Category</option>
 {options.map((option) => (
   <option key={option.value} value={option.value} data-name={option.label}>
     {option.value} - {option.label} {/* Aid - Aname */}
   </option>
 ))}
</select>
     {errorsfield.clientnew && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.clientnew}</span>}
</div>


                                             <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Enter Prediction Title"
                className="form-control h-56-px bg-neutral-50 radius-12"
              
            />
             {errorsfield.title && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title}</span>}
            </div>
            <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setDated(e.target.value)}
            type="date"
            id="dated"
            name="dated"
            value={dated}
            placeholder="Select Date"
                className="form-control h-56-px bg-neutral-50 radius-12"
              
            />
             {errorsfield.dated && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.dated}</span>}
            </div>
            <div  style={{marginTop:"15px"}}>
            
            <textarea
                onChange={(e) => setDescription(e.target.value)}
            type="text"
            id="description"
            name="description"
            value={description}
            placeholder="Enter Horoscope Prediction here"
                className="form-control bg-neutral-50 radius-12"
              style={{minHeight:"120px"}}
            />
             {errorsfield.description && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.description}</span>}
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
                                   <b>Use the following datalist</b><br/>to modify / remove listed horoscope predictions.
                               </p>
                               <div className="d-flex flex-wrap gap-2 mb-3">
  {/* Date Filter */}
  <input
    type="date"
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
    className="form-control w-auto"
    style={{ maxWidth: "200px", backgroundColor:"#fafafa" }}
  />

  {/* Category Filter */}
  <select
    value={filterCategory}
    onChange={(e) => setFilterCategory(e.target.value)}
    className="form-control w-auto"
    style={{ maxWidth: "200px", backgroundColor:"#fafafa" }}
  >
    <option value="">Filter By Category</option>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</div>
                               <table className="table bordered-table sm-table mb-0">
                            <thead>
                                        <tr>
                                            <th scope="col">S No.</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Prediction</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
  {filteredClients.map(client => (
    <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Sno}</td>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Hid} - {client.Hname}</td>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>
        <b>{client.Title}</b><br />{client.Descriptions}<br />{client.Dated}
      </td>
      <td style={{ padding: "10px" }}>
        <Button className="btn-success btn-small" style={{ padding: "5px 10px", fontSize: "0.8rem", borderRadius: "5px", border: "none", cursor: "pointer", transition: "0.3s" }}>
          Manage
        </Button><br />
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

export default Horoscopes