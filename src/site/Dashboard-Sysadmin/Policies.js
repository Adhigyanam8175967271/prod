
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Policies = () => {

const [message1, setMessage1] = useState("");
const [messageerror1, setMessageerror1] = useState("");

const [message2, setMessage2] = useState("");
const [messageerror2, setMessageerror2] = useState("");

const [message3, setMessage3] = useState("");
const [messageerror3, setMessageerror3] = useState("");

const [message4, setMessage4] = useState("");
const [messageerror4, setMessageerror4] = useState("");

const [isSubmitting, setIsSubmitting] = useState(false);

const [errors1, setErrors1] = useState({});
const [errors2, setErrors2] = useState({});
const [errors3, setErrors3] = useState({});
const [errors4, setErrors4] = useState({});

const [fdesc1, setFdesc1] = useState("");
const [fdesc2, setFdesc2] = useState("");
const [fdesc3, setFdesc3] = useState("");
const [fdesc4, setFdesc4] = useState("");

const handleSubmit1 = async (e) => {
  e.preventDefault();

 const newErrors = validationnew("fdesc1", fdesc1);
if (Object.keys(newErrors).length > 0) {
  setErrors1(newErrors);
  return;
}
setErrors1({}); // clear previous errors if valid

  setIsSubmitting(true);
  try {
    const response = await axios.post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/updatepolicy1", {
      policyType: "terms",
      content: fdesc1,
    });
    if (response.data === "Success") {
      setMessage1("Successfully updated Terms of Usage.");
      setMessageerror1("");
    } else {
      setMessageerror1("Update failed. Try again.");
      setMessage1("");
    }
  } catch (error) {
    setMessageerror1("An error occurred.");
    setMessage1("");
  } finally {
    setIsSubmitting(false);
  }
};

const handleSubmit2 = async (e) => {
  e.preventDefault();
 
 const newErrors = validationnew("fdesc2", fdesc2);
if (Object.keys(newErrors).length > 0) {
  setErrors2(newErrors);
  return;
}
setErrors2({}); // clear previous errors if valid

  setIsSubmitting(true);
  try {
    const response = await axios.post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/updatepolicy2", {
      policyType: "ppolicy",
      content: fdesc2,
    });
    if (response.data === "Success") {
      setMessage2("Successfully updated Privacy Policy.");
      setMessageerror2("");
    } else {
      setMessageerror2("Update failed. Try again.");
      setMessage2("");
    }
  } catch (error) {
    setMessageerror2("An error occurred.");
    setMessage2("");
  } finally {
    setIsSubmitting(false);
  }
};

const handleSubmit3 = async (e) => {
  e.preventDefault();
  
 const newErrors = validationnew("fdesc3", fdesc3);
if (Object.keys(newErrors).length > 0) {
  setErrors3(newErrors);
  return;
}
setErrors3({}); // clear previous errors if valid

  setIsSubmitting(true);
  try {
    const response = await axios.post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/updatepolicy3", {
      policyType: "spolicy",
      content: fdesc3,
    });
    if (response.data === "Success") {
      setMessage3("Successfully updated Shipping Policy.");
      setMessageerror3("");
    } else {
      setMessageerror3("Update failed. Try again.");
      setMessage3("");
    }
  } catch (error) {
    setMessageerror3("An error occurred.");
    setMessage3("");
  } finally {
    setIsSubmitting(false);
  }
};

const handleSubmit4 = async (e) => {
  e.preventDefault();
  
 const newErrors = validationnew("fdesc4", fdesc4);
if (Object.keys(newErrors).length > 0) {
  setErrors4(newErrors);
  return;
}
setErrors4({}); // clear previous errors if valid

  setIsSubmitting(true);
  try {
    const response = await axios.post("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/updatepolicy4", {
      policyType: "rpolicy",
      content: fdesc4,
    });
    if (response.data === "Success") {
      setMessage4("Successfully updated Refund Policy.");
      setMessageerror4("");
    } else {
      setMessageerror4("Update failed. Try again.");
      setMessage4("");
    }
  } catch (error) {
    setMessageerror4("An error occurred.");
    setMessage4("");
  } finally {
    setIsSubmitting(false);
  }
};

useEffect(() => {
  axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/fetchpolicies")
    .then((res) => {
      setFdesc1(res.data.terms);
      setFdesc2(res.data.ppolicy);
      setFdesc3(res.data.spolicy);
      setFdesc4(res.data.rpolicy);
    });
}, []);



    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
      <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                   <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Website Policies
                               </p>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
     
      <div className="auth-left py-32 px-24 d-flex flex-column" style={{background:"none",width:"auto"}}>
                    <div className="max-w-464-px mx-auto w-100">
                    <div>
                           
                               <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>A. Terms Of Usage</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following control to update Terms of Usage on the website.
                               </p>
                               {message1 && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message1}</p>}
                                 {messageerror1 && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror1}</p>}
                               <form onSubmit={handleSubmit1}>
                               
                               <div style={{ marginTop: "0px" }}>
                                 <ReactQuill
                                   theme="snow" // You can use "bubble" for a different UI
                                   value={fdesc1}
                                   onChange={setFdesc1} // React Quill passes content directly
                                   placeholder="Type here..."
                                   className="bg-neutral-50 radius-12"
                                   style={{ Height: "20px" }} // Adjust height if needed
                                 />
                                {errors1.fdesc1 && (
  <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
    {errors1.fdesc1}
  </span>
)}
                               </div>
                              
                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                        {isSubmitting ? 'Please Wait...' : 'Update'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                              
                           </div>

                            <div  style={{marginTop:"20px"}}>
                               
                           <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>B. Privacy Policy</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following control to update Privacy Policy on the website.
                               </p>
                               {message2 && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message2}</p>}
                                 {messageerror2 && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror2}</p>}
                               <form onSubmit={handleSubmit2}>
                               
                               <div style={{ marginTop: "0px" }}>
                                 <ReactQuill
                                   theme="snow" // You can use "bubble" for a different UI
                                   value={fdesc2}
                                   onChange={setFdesc2} // React Quill passes content directly
                                   placeholder="Type here..."
                                   className="bg-neutral-50 radius-12"
                                   style={{ Height: "20px" }} // Adjust height if needed
                                 />
                                {errors2.fdesc2 && (
  <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
    {errors2.fdesc2}
  </span>
)}
                               </div>
                              
                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                        {isSubmitting ? 'Please Wait...' : 'Update'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                           </div>
                    </div>
                </div>
                   <div className="auth-right py-32 px-24 d-flex flex-column">
                       <div className="max-w-464-px mx-auto w-100">
                           <div>
                               
                           <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>C. Shipping Policy</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following control to update Shipping Policy on the website.
                               </p>
                               {message3 && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message3}</p>}
                                 {messageerror3 && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror3}</p>}
                               <form onSubmit={handleSubmit3}>
                               
                               <div style={{ marginTop: "0px" }}>
                                 <ReactQuill
                                   theme="snow" // You can use "bubble" for a different UI
                                   value={fdesc3}
                                   onChange={setFdesc3} // React Quill passes content directly
                                   placeholder="Type here..."
                                   className="bg-neutral-50 radius-12"
                                   style={{ Height: "20px" }} // Adjust height if needed
                                 />
                                {errors3.fdesc3 && (
  <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
    {errors3.fdesc3}
  </span>
)}
                               </div>
                              
                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                        {isSubmitting ? 'Please Wait...' : 'Update'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                           </div>

                            <div style={{marginTop:"20px"}}>
                               
                           <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>D. Refund Policy</p>
                               <p className="mb-32 text-secondary-light text-lg">
                                   Use the following control to update Refund Policy on the website.
                               </p>
                               {message4 && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message4}</p>}
                                 {messageerror4 && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror4}</p>}
                               <form onSubmit={handleSubmit4}>
                               
                               <div style={{ marginTop: "0px" }}>
                                 <ReactQuill
                                   theme="snow" // You can use "bubble" for a different UI
                                   value={fdesc4}
                                   onChange={setFdesc4} // React Quill passes content directly
                                   placeholder="Type here..."
                                   className="bg-neutral-50 radius-12"
                                   style={{ Height: "20px" }} // Adjust height if needed
                                 />
                                {errors4.fdesc4 && (
  <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
    {errors4.fdesc4}
  </span>
)}
                               </div>
                              
                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                        {isSubmitting ? 'Please Wait...' : 'Update'}
                                        </Button>
                                        
                                      </div>
                                    </form>
                           </div>
                       </div>
                   </div>
               </section>
     
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default Policies