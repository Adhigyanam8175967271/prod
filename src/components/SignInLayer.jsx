import React, { useState } from "react";


import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";
import axios from "axios";

import validation from '../Validations/Login-Email.js';
import validationnew from '../Validations/Login-Password.js';

import cookies, {useCookies} from "react-cookie";

const SignInLayer = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  
  const [errors, setErrors] = useState({})
  const [errorsnew, setErrorsnew] = useState({})
  
  
  const [passState, setPassState] = useState(false);
  const handleSubmit =(event) => 
    {
      event.preventDefault();
      setErrors(validation(email));
      setErrorsnew(validationnew(password));
     

       if(errors.email === "" && errorsnew.password === "")
         {
          setIsSubmitting(true); // Disable the button immediately
      const userData = {
        email,
        password
      };
          axios.post('https://adhigyanam-e92bf1bbbdb1.herokuapp.com/administrator', userData)
          .then(res => {

            if(res.data === "Success")
              {
                      setCookie("token", email, { path: "/" });
                      window.location.href = "/dashboard";
                
              }
              else
              {
                // alert("Invalid Credentials! Please Try Again.")
                setMessage("Invalid Login Credentials! Try again or contact Support.");
                setIsSubmitting(false); // Re-enable the button after submission
              }
            
          })
          .catch(err => console.log(err));
        }
    }
  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='siteimages/sysadmin.jpeg' alt='' />
        </div>
      </div>
      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/' className='mb-40 max-w-290-px'>
              <img src='siteimages/logo.png' style={{height:"50px"}} alt='' />
            </Link>
            {message && <p style={{padding:5, backgroundColor:"grey", color:"white", borderRadius:5}}>{message}</p>}
            <h6 className='mb-12'>Employee Extranet</h6>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome Back! Please enter your details below to continue to your dashboard.
            </p>
          </div>
          <form action="" onSubmit={handleSubmit}> 
            
          <div className='position-relative'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Enter Reg. Email Address"
                className='form-control h-56-px bg-neutral-50 radius-12'
                
              />
               {errors.email && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errors.email}</span>}
           </div>
           
            <div className='position-relative' style={{marginTop:"15px"}}>
              
                
                <input 
                onChange={(e) => setPassword(e.target.value)} 
                   type="password"
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Enter Secure Password"
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  
                />
              
               {errorsnew.password && <span className="text-danger" style={{fontSize:"0.8rem", fontWeight:"bolder"}}>{errorsnew.password}</span>}
            </div>
           
           
             <Button disabled={isSubmitting} className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32' type="submit">
                              {isSubmitting ? 'Please Wait...' : 'Continue to Your Dashboard'}
                              </Button>
          
            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Accidently landed here?{" "}
                <Link to='/' className='text-primary-600 fw-semibold'>
                  Return Home
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
