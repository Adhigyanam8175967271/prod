
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const CreateCourses = () => {

const [message, setMessage] = useState("");
const [messageerror, setMessageerror] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
const [errorsfield, setErrorsfield] = useState({});

const [sno, setSno] = useState("");
const [validity, setValidity] = useState("");
const [title, setTitle] = useState("");
const [ename, setEname] = useState("");
const [smat, setSmat] = useState("");
const [clientAid, setClientAid] = useState("");  // Stores Csid (Id)
const [clientAname, setClientAname] = useState(""); // Stores Csname (Named)
const [clientAidnew, setClientAidnew] = useState("");  // Stores Lid (Id)
const [clientAnamenew, setClientAnamenew] = useState(""); // Stores Lname (Named)
const [qdesc, setQdesc] = useState("");
const [fdesc, setFdesc] = useState("");
const [sdesc, setSdesc] = useState("");
const [price1, setPrice1] = useState("");
const [price2, setPrice2] = useState("");
const [values, setValues] = useState({
  image1: null, 
});

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
    ...validationnew("validity", validity),
    ...validationnew("ename", ename),
    ...validationnew("sdesc", sdesc),
    ...validationnew("price1", price1),
    ...validationnew("price2", price2),
  };

  // Dropdown Validation (Check if both Aid and Aname are selected)
  if (!clientAid || !clientAname) {
    newErrors.clientnew = "Please select a valid category";
  }

   if (!clientAidnew || !clientAnamenew) {
    newErrors.clientnew1 = "Please select a valid category";
  }

  if (!smat) {
  newErrors.smat = "Please select course add-ons";
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
  formData.append("clientAid", clientAid); // Csid (Id)
  formData.append("clientAname", clientAname); // Csname (Named)
  formData.append("clientAidnew", clientAidnew); // Lid (Id)
  formData.append("clientAnamenew", clientAnamenew); // Lname (Named)
  formData.append('qdesc', qdesc);
  formData.append('sdesc', sdesc);
  formData.append('fdesc', fdesc);
  formData.append('ename', ename);
  formData.append('smat', smat);
  formData.append('price1', price1);
  formData.append('price2', price2);
  formData.append('validity', validity);
  axios
    .post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/uploadcourse", formData)
    .then((res) => {
      if (res.data === "Success") {
        setMessage("Operation was Successful! Uploaded successfully");
        setMessageerror("");
        setSno("");
        setTitle("");
        setClientAid(""); // Reset Csid
        setClientAname(""); // Reset Csname
        setClientAidnew(""); // Reset Lid
        setClientAnamenew(""); // Reset Lname
        setQdesc("");
        setSdesc("");
        setFdesc("");
        setSmat("");
        setEname("");
        setPrice1("");
        setPrice2("");
        setValidity("");
        setValues({ image1: null });
        setIsSubmitting(false);
        event.target.reset();
      }
    })
    .catch((err) => {
      setMessageerror("An error occurred! Please recheck or try again.");
      setMessage("");
      setIsSubmitting(false);
    });
};
   
const [options, setOptions] = useState([]);

useEffect(() => {

  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/subcoursecategories')
    .then(response => {
      setOptions(response.data.map(item => ({ value: item.Id, label: item.Named })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []); 

const [optionsnew, setOptionsnew] = useState([]);

useEffect(() => {

  axios.get('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/languages')
    .then(response => {
      setOptionsnew(response.data.map(item => ({ value: item.Id, label: item.Named })));
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
                                   <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Create New Course
                               </p>
                              
                                <form action="" onSubmit={handleSubmit}>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
      <div className="auth-left py-32 px-24 d-flex flex-column" style={{background:"none",width:"auto"}}>
                    <div className="max-w-464-px mx-auto w-100">
                    <div>
                           
                           <div>
                             <p className="mb-12 text-secondary-light text-lg">
                                   Use the following form to add a new course to the website. <b>Thumbnail Resolution: 500 X 350</b>
                               </p>
                               {message && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message}</p>}
                                 {messageerror && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror}</p>}
                           </div>  
                              
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
  <option value="">-- Select Category --</option>
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



                               
                      <div style={{marginTop:"15px"}}>

                                     <input
                                         onChange={(e) => setValidity(e.target.value)}
                        type="number"
                        id="validity"
                        name="validity"
                        value={validity}
                        placeholder="Course Validity"
                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                       
                                     />
                                      {errorsfield.validity && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.validity}</span>}
                                 </div>
                   <div style={{ marginTop: "15px" }}>
  <ReactQuill
    theme="snow" // You can use "bubble" for a different UI
    value={fdesc}
    onChange={setFdesc} // React Quill passes content directly
    placeholder="Course Description"
    className="bg-neutral-50 radius-12"
  />
  {errorsfield.fdesc && (
    <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
      {errorsfield.fdesc}
    </span>
  )}
</div>
                                    
                              
                           </div>
                    </div>
                </div>
                   <div className="auth-right py-32 px-24 d-flex flex-column">
                       <div className="max-w-464-px mx-auto w-100">
                          

<div style={{ marginTop: "0px" }}>
  <ReactQuill
    theme="snow" // You can use "bubble" for a different UI
    value={sdesc}
    onChange={setSdesc} // React Quill passes content directly
    placeholder="What Will You Learn"
    className="bg-neutral-50 radius-12"
  />
  {errorsfield.sdesc && (
    <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
      {errorsfield.sdesc}
    </span>
  )}
</div>
<div  style={{marginTop:"15px"}}>

 <select
  id="clientnew1"
  name="clientnew1"
  className="form-control h-56-px bg-neutral-50 radius-12"
  onChange={(e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedAid = e.target.value; // Gets Aid (Id)
    const selectedAname = e.target.options[selectedIndex].getAttribute("data-name"); // Gets Named (Aname)
    
    setClientAidnew(selectedAid);
    setClientAnamenew(selectedAname);
  }}
>
  <option value="">-- Select Language Mode --</option>
  {optionsnew.map((option) => (
    <option key={option.value} value={option.value} data-name={option.label}>
      {option.value} - {option.label} {/* Aid - Aname */}
    </option>
  ))}
</select>
      {errorsfield.clientnew1 && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.clientnew1}</span>}
</div>
<div  style={{marginTop:"15px"}}>

 <select
  id="smat"
  name="smat"
  value={smat}
  className="form-control h-56-px bg-neutral-50 radius-12"
  onChange={(e) => setSmat(e.target.value)}
>
  <option value="">-- Select Study Material Option --</option>
  <option value="Contains Study materials">Contains Study materials</option>
  <option value="No Study Material">No Study Material</option>
</select>
      {errorsfield.smat && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsfield.smat}</span>}
</div>
 <div  style={{marginTop:"15px"}}>

<input
    onChange={(e) => setEname(e.target.value)}
type="text"
id="ename"
name="ename"
value={ename}
placeholder="Educator's Name"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsfield.ename && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.ename}</span>}
</div>
 <div  style={{marginTop:"15px"}}>

<input
     onChange={(e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice1(value);
    }
  }}
type="text"
id="price1"
name="price1"
value={price1}
placeholder="Enter Course Fee"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsfield.price1 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.price1}</span>}
</div>
 <div  style={{marginTop:"15px"}}>

<input
     onChange={(e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice2(value);
    }
  }}
type="text"
id="price2"
name="price2"
value={price2}
placeholder="Enter Add-Ons Fee"
    className="form-control h-56-px bg-neutral-50 radius-12"
  
/>
 {errorsfield.price2 && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errorsfield.price2}</span>}
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
 <div style={{marginTop:"0px"}}>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-12">
                                        {isSubmitting ? 'Please Wait...' : 'Create a New Course'}
                                        </Button>
                                        
                                      </div>
                       </div>
                   </div>
                    
               </section>
     </form>
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default CreateCourses