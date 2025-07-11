
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Blogs = () => {

const [message, setMessage] = useState("");
const [messageerror, setMessageerror] = useState("");

const [isSubmitting, setIsSubmitting] = useState(false);

const [errorsfield, setErrorsfield] = useState({});

const [sno, setSno] = useState("");
const [smat, setSmat] = useState("");
const [title, setTitle] = useState("");
const [clientnew, setClientnew] = useState(""); 
const [clientAid, setClientAid] = useState("");  // Stores Aid (Id)
const [clientAname, setClientAname] = useState(""); // Stores Aname (Named)
const [clientAidnew, setClientAidnew] = useState("");  // Stores Aid (Id)
const [clientAnamenew, setClientAnamenew] = useState(""); // Stores Aname (Named)
const [qdesc, setQdesc] = useState("");
const [fdesc, setFdesc] = useState("");
const [values, setValues] = useState({
  image1: null, 
});

const [dated, setDated] = useState("");
const [selectedCategory, setSelectedCategory] = useState(""); // Filter state
const [filteredClients, setFilteredClients] = useState([]); // Filtered data


const [clients, setClients] = useState([]);

const fetchClients = () => {
  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/blogs')
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

useEffect(() => {
  if (selectedCategory) {
    setFilteredClients(clients.filter(client => client.Bid === selectedCategory));
  } else {
    setFilteredClients(clients);
  }
}, [selectedCategory, clients]);


const handleFileChange = (event, imageNumber) => {
  const file = event.target.files[0];
  if (file) {
    setValues(prev => ({ ...prev, [`image${imageNumber}`]: file }));
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  // Validate all fields including dropdown selection
  const newErrors = {
    ...validationnew("sno", sno),
    ...validationnew("title", title),
    ...validationnew("qdesc", qdesc),
    ...validationnew("fdesc", fdesc),
    ...validationnew("dated", dated),
  };

  // Dropdown Validation (Check if both Aid and Aname are selected)
  if (!clientAid || !clientAname) {
    newErrors.clientnew = "Please select a valid category";
  }

   if (!clientAidnew || !clientAnamenew) {
    newErrors.clientlatest = "Please select an author";
  }

  if (!smat) {
  newErrors.smat = "Please select Expert Advice Selection";
}

  // Image validation
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
  formData.append("image1", values.image1);
  formData.append("sno", sno);
  formData.append("title", title);
  formData.append("clientAid", clientAid); // Aid (Id)
  formData.append("clientAname", clientAname); // Aname (Named)
  formData.append('qdesc', qdesc);
  formData.append('fdesc', fdesc);
  formData.append('dated', dated);
  formData.append('smat', smat);
  formData.append("clientAidnew", clientAidnew); // Lid (Id)
  axios
    .post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/uploadblog", formData)
    .then((res) => {
      if (res.data === "Success") {
        setMessage("Operation was Successful! Uploaded successfully");
        setMessageerror("");
        setSno("");
        setTitle("");
        setClientAid(""); // Reset Aid
        setClientAname(""); // Reset Aname
         setClientAidnew(""); // Reset Aid
        setClientAnamenew(""); // Reset Aname
        setSmat("");
        setQdesc("");
        setFdesc("");
        setDated("");
        setValues({ image1: null });
        setIsSubmitting(false);
        event.target.reset();
        fetchClients();
      }
    })
    .catch((err) => {
      setMessageerror("An error occurred! Please recheck or try again.");
      setMessage("");
      setIsSubmitting(false);
    });
};
   
const handleDelete = (clientId) => {
  // Make an API call to delete the client
  axios.delete(`https://adhigyanam-e92bf1bbbdb1.herokuapp.com/deleteblog/${clientId}`)
    .then(response => {
      // If deletion is successful, update the clients array to remove the deleted client
      setClients(clients.filter(client => client.Id !== clientId));
    })
    .catch(error => {
      console.error('Error deleting Sub Category:', error);
      // Handle error, such as displaying an error message
    });
};

const [options, setOptions] = useState([]);

useEffect(() => {

  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/blogcategories')
    .then(response => {
      setOptions(response.data.map(item => ({ value: item.Id, label: item.Named })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []); 

const [optionsnew, setOptionsnew] = useState([]);

useEffect(() => {

  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/bauthors')
    .then(response => {
      setOptionsnew(response.data.map(item => ({ value: item.Id, label: item.Aname })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []); 


    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
      <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                   <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | <NavLink to="/dashboardbc" style={{color:'blueviolet', textDecoration:"underline"}}>Categories</NavLink> | Blogs
                               </p>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
      <div className="auth-left py-32 px-24 d-flex flex-column" style={{background:"none",width:"auto"}}>
                    <div className="max-w-464-px mx-auto w-100">
                    <div>
                           
                               <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>A. Publish New Article</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following form to add a new blog article to the website. <b>Recommended Resolution: 500 X 350</b>
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
  <option value="">Select Blog Category</option>
  {options.map((option) => (
    <option key={option.value} value={option.value} data-name={option.label}>
      {option.value} - {option.label} {/* Aid - Aname */}
    </option>
  ))}
</select>
      {errorsfield.clientnew && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.clientnew}</span>}
</div>
 <div  style={{marginTop:"15px"}}>

 <select
  id="clientlatest"
  name="clientlatest"
  className="form-control h-56-px bg-neutral-50 radius-12"
  onChange={(e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedAidnew = e.target.value; // Gets Aid (Id)
    const selectedAnamenew = e.target.options[selectedIndex].getAttribute("data-name"); // Gets Named (Aname)
    
    setClientAidnew(selectedAidnew);
    setClientAnamenew(selectedAnamenew);
  }}
>
  <option value="">Select Blog Author</option>
  {optionsnew.map((option) => (
    <option key={option.value} value={option.value} data-name={option.label}>
      {option.value} - {option.label} {/* Aid - Aname */}
    </option>
  ))}
</select>
      {errorsfield.clientlatest && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.clientlatest}</span>}
</div>
<div  style={{marginTop:"15px"}}>

 <select
  id="smat"
  name="smat"
  value={smat}
  className="form-control h-56-px bg-neutral-50 radius-12"
  onChange={(e) => setSmat(e.target.value)}
>
  <option value="">-- Expert Advice Selection --</option>
  <option value="1">Yes</option>
  <option value="0">No</option>
</select>
      {errorsfield.smat && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.smat}</span>}
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

<input
    onChange={(e) => setQdesc(e.target.value)}
type="text"
id="qdesc"
name="qdesc"
value={qdesc}
placeholder="Enter Quick Description"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsfield.qdesc && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.qdesc}</span>}
</div>
<div style={{ marginTop: "15px" }}>
  <ReactQuill
    theme="snow" // You can use "bubble" for a different UI
    value={fdesc}
    onChange={setFdesc} // React Quill passes content directly
    placeholder="Enter Full Article here"
    className="bg-neutral-50 radius-12"
    style={{ Height: "20px" }} // Adjust height if needed
  />
  {errorsfield.fdesc && (
    <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
      {errorsfield.fdesc}
    </span>
  )}
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
                                        {isSubmitting ? 'Please Wait...' : 'Publish Blog Article'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                              
                           </div>
                    </div>
                </div>
                   <div className="auth-right py-32 px-24 d-flex flex-column">
                       <div className="max-w-464-px mx-auto w-100">
                           <div>
                               
                           <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>B. Manage Listed Articles</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following modify / remove listed blog articles.
                               </p>
                               <div style={{ marginBottom: "15px" }}>
          <select
            className="form-control h-56-px bg-neutral-50 radius-12"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Filter By Category --</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ overflowX: "auto", width: "100%" }}>
        <table className="table bordered-table sm-table mb-0" style={{width:"100%"}}>
          <thead>
            <tr>
              <th scope="col">S No.</th>
              <th scope="col">Blog Title</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.Id} style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", transition: "0.3s" }}>
                <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Sno}</td>
                <td style={{ padding: "10px", fontSize: "0.9rem", color: "#333", backgroundColor: "white" }}>{client.Bid} - {client.Bname}<br />{client.Title}<br />{client.Dated}</td>
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

export default Blogs