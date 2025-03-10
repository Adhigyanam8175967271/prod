import React, { useState, useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import { Button } from "reactstrap";
import axios from "axios";
import validation from '../../Validations/Login-Email.js';
import validationnew from '../../Validations/Login-Password.js';
import cookies, {useCookies} from "react-cookie";


const Credentials = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [messageerror, setMessageerror] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [errors, setErrors] = useState({});
  const [errorsnew, setErrorsnew] = useState({});
  const [cookies, setCookie] = useCookies(["token"]);
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Form Submitted");
      setErrors(validation(email));
      setErrorsnew(validationnew(password));
  
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Errors:", errors);
      console.log("New Errors:", errorsnew);
  
      if (errors.email === "" && errorsnew.password === "") {
          setIsSubmitting(true); // Disable the button immediately
          const userData = {
              email,
              password
          };
          console.log("User Data to be sent:", userData);
  
          axios.post('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/administratorupdate', userData)
              .then(res => {
                  console.log("Response from server:", res.data);
  
                  if (res.data === "Success") {
                      setCookie("token", email, { path: "/" });
                      setMessage("Operation Success! Credentials were updated successfully!");
                      setMessageerror("");
                      setEmail("");
                    setPassword("");
                      setIsSubmitting(false);
                  } else {
                      setMessageerror("Sorry! An error occurred please try again later.");
                      setMessage("");
                      setIsSubmitting(false);
                  }
              })
              .catch(err => {
                  console.error("Axios request failed:", err);
                  setMessageerror("An error occurred. Please try again later.");
                  setIsSubmitting(false);
              });
      }
  }
  

    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
         <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                           <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet'}}>Dashboard</NavLink> | Credentials Mnagement
                                       </p>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
                   
                     <div className="auth-right py-32 px-24 d-flex flex-column">
                         <div className="max-w-464-px mx-auto w-100">
                             <div>
                            
                             <p className="mb-6" style={{fontWeight:'bold',fontSize:"18px"}}>Manage Extranet Credentials</p>
                                 <p className="mb-32 text-secondary-light text-lg">
                                     Use the following form to manage your account credentials. Do update the credentials in case the credentials are compromised.
                                 </p>

                                 {message && <p style={{padding:5, backgroundColor:"green", color:"white", borderRadius:2}}>{message}</p>}
                                 {messageerror && <p style={{padding:5, backgroundColor:"red", color:"white", borderRadius:2}}>{messageerror}</p>}

                             </div>
                             <form action="" onSubmit={handleSubmit}>
                                 <div>
                                     <input
                                         onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter Email Address"
                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                       
                                     />
                                      {errors.email && <span className="text-danger" style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>{errors.email}</span>}
                                 </div>
                                 <div style={{marginTop:"15px"}}>
                                     <input
                                        onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Enter New Password"
                                         className="form-control h-56-px bg-neutral-50 radius-12"
                                 
                                     />
                                     {errorsnew.password && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsnew.password}</span>}
                                 </div>
                                 <Button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">
                                                     {isSubmitting ? 'Please Wait...' : 'Update Credentials'}
                                                     </Button>
                             </form>
                         </div>
                     </div>
                 </section>
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default Credentials