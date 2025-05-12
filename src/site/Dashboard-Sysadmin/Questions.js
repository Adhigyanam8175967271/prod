import React, { useState, useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink, useParams } from 'react-router-dom'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const Questions = () => {
  const { clientId } = useParams();
  const [message, setMessage] = useState("");
  const [messageerror, setMessageerror] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const [errorsfield, setErrorsfield] = useState({});
  
  
  const [sno, setSno] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [clientAid, setClientAid] = useState("");  
  const [clientAname, setClientAname] = useState(""); 

  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");
  const [smat, setSmat] = useState("");
  
  
const [clients, setClients] = useState([]);

const fetchClients = (clientId) => {
  axios.get(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/questions/${clientId}`)
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

    const newErrors = {
        ...validationnew("sno", sno),
        ...validationnew("title", title),
         ...validationnew("title1", title1),
          ...validationnew("title2", title2),
           ...validationnew("title3", title3),
            ...validationnew("title4", title4),
    };

   
  if (!clientAid || !clientAname) {
    newErrors.clientnew = "Please select a course video";
  }

   if (!smat) {
  newErrors.smat = "Please select the correct option";
}

    setErrorsfield(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    axios.post(
        'https://adhigyanam-e92bf1bbbdb1.herokuapp.com/createquestion',
        { sno, title, description, clientId, clientAid, clientAname, title1, title2, title3, title4, smat },  // Sending as JSON
        { headers: { 'Content-Type': 'application/json' } } // Set JSON header
    )
    .then(res => {
        if (res.data === "Success") {
            setMessage("Operation was Successful!");
            setMessageerror("");
            setSno(""); 
            setTitle("");
            setDescription("");
            setClientAid(""); 
            setClientAname(""); 
             setTitle1("");
              setTitle2("");
               setTitle3("");
                setTitle4("");
                setSmat("");
            setIsSubmitting(false);
            fetchClients(clientId);
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
    axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deletequestion/${clientId}`)
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
  axios.get(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/video/${clientId}`)
    .then(response => {
      setOptions(response.data.map(item => ({ value: item.Id, label: item.Title })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, [clientId]);


    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
         <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                           <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | <NavLink to="/dashboardcourses" style={{color:'blueviolet', textDecoration:"underline"}}>Courses</NavLink>  | Q & A
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
                                                                            A. Add MCQ Record
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
                                                                           B. Manage Existing MCQs
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
                                               <b>Use the following form</b><br/>to add a new MCQ record to the corresponding course.
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
  <option value="">-- Select Video --</option>
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
            placeholder="Enter Question"
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
            placeholder="Description [Optional]"
                className="form-control bg-neutral-50 radius-12"
              style={{minHeight:"120px"}}
            />
            </div>

              <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setTitle1(e.target.value)}
            type="text"
            id="title1"
            name="title1"
            value={title1}
            placeholder="Enter Option A"
                className="form-control h-56-px bg-neutral-50 radius-12"
              
            />
             {errorsfield.title1 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title1}</span>}
            </div>

              <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setTitle2(e.target.value)}
            type="text"
            id="title2"
            name="title2"
            value={title2}
            placeholder="Enter Option B"
                className="form-control h-56-px bg-neutral-50 radius-12"
              
            />
             {errorsfield.title2 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title2}</span>}
            </div>

              <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setTitle3(e.target.value)}
            type="text"
            id="title3"
            name="title3"
            value={title3}
            placeholder="Enter Option C"
                className="form-control h-56-px bg-neutral-50 radius-12"
              
            />
             {errorsfield.title3 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title3}</span>}
            </div>

              <div  style={{marginTop:"15px"}}>
            
            <input
                onChange={(e) => setTitle4(e.target.value)}
            type="text"
            id="title4"
            name="title4"
            value={title4}
            placeholder="Enter Option D"
                className="form-control h-56-px bg-neutral-50 radius-12"
              
            />
             {errorsfield.title4 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.title4}</span>}
            </div>

            <div  style={{marginTop:"15px"}}>

 <select
  id="smat"
  name="smat"
  value={smat}
  className="form-control h-56-px bg-neutral-50 radius-12"
  onChange={(e) => setSmat(e.target.value)}
>
  <option value="">-- Select Correct Option --</option>
  <option value="A">Option A</option>
  <option value="B">Option B</option>
  <option value="C">Option C</option>
  <option value="D">Option D</option>
</select>
      {errorsfield.smat && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.smat}</span>}
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
                                   <b>Use the following datalist</b><br/>to modify / remove listed MCQ records.
                               </p>
                              
 <div style={{ overflowX: "auto", width: "100%" }}>
                               <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
                            <thead>
                                        <tr>
                                            <th scope="col">S No.</th>
                                            <th scope="col">MCQ</th>
                                            <th scope="col">Options</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
  {clients.map(client => (
    <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Sno}</td>
      <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}><b>{client.Title}</b><br/>{client.Qdesc}<br/><b>Option A</b>: {client.Optiona}<br/><b>Option B</b>: {client.Optionb}<br/><b>Option C</b>: {client.Optionc}<br/><b>Option D</b>: {client.Optiond}<br/><b>Result</b>: {client.Result}</td>
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

export default Questions