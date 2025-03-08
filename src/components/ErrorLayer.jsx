import React from "react";
import { Link } from "react-router-dom";

const ErrorLayer = () => {
  return (
    <div className='card basic-data-table'>
      <div className='card-body py-60 px-32 text-center'>
        <img src='siteimages/284270.png' alt='' className='mb-24' />
        <h5 className='mb-16'>Page not Found</h5>
        <p className='text-secondary-light'>
          Sorry, the page you are looking for doesn’t exist.<br/>It may have been renamed or permanently removed from the system.
        </p>
        <Link to='/' className='btn btn-primary-600 radius-8 px-20 py-11'>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorLayer;
