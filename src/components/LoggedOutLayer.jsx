import React from "react";
import { Link } from "react-router-dom";

const LoggedOutLayer = () => {
  return (
    <div className='card basic-data-table'>
      <div className='card-body py-60 px-32 text-center'>
        <img src='siteimages/loggedout.png' alt='' />
        <h5 className='mb-16'>You have been Logged Out Successfully</h5>
        <p className='text-secondary-light'>
          Logout operation was successfull.<br/>All cookies and login information has been cleared from this browser.
        </p>
        <Link to='/' className='btn btn-primary-600 radius-8 px-20 py-11' style={{marginRight:"3px"}}>
          Back to Home
        </Link>
        <Link to='/sysadmin' className='btn btn-primary-600 radius-8 px-20 py-11' style={{marginLeft:"3px"}}>
          Login Again
        </Link>
      </div>
    </div>
  );
};

export default LoggedOutLayer;
