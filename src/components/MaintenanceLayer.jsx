import React from "react";
import { Link } from "react-router-dom";

const MaintenanceLayer = () => {
  return (
    <div className='custom-bg'>
      <div className='container container--xl'>
        <div className='d-flex align-items-center justify-content-between py-24'>
          <Link to='/' className=''>
            <img src='siteimages/logo.png' style={{height:50}} alt='' />
          </Link>
          <Link to='/sysadmin' className='btn btn-primary-600 px-24 flex-shrink-0 d-flex align-items-center justify-content-center gap-8'>
            {" "}
            Employee Extranet{" "}
          </Link>
        </div>
        <div className='py-res-120'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h3 className='mb-32 max-w-1000-px' style={{fontSize:41}}>
                Our website is currently <span style={{color:"#B50504"}}>under maintenance</span>. Your patience is highly appreciated!
              </h3>
              <p className='text-neutral-500 max-w-700-px text-lg'>
                Our team have been spending extended periods to bring up our new website.
                We have been <span style={{fontWeight:"bold", display:"unset"}}>upgrading features and services for your customers and visitors</span>. We will be back very soon.
              </p>
              
            </div>
            <div className='col-lg-6 d-lg-block d-none'>
              <img src='siteimages/website-maintenance.png' style={{borderRadius:"5px"}} alt='Under Maintenance' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceLayer;
