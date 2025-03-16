import React from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";

import Breadcrumb from "../../components/Breadcrumb";

import BlankPageLayer from "../../components/BlankPageLayer";



// import LatestRegisteredOne from '../../components/child/LatestRegisteredOne';

import UnitCountOne from '../../components/child/UnitCountOne';


const DashBoardLayerOne = () => {

    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Home' />
        <UnitCountOne />

        <section className="row gy-4 mt-1">

              

                {/* LatestRegisteredOne */}
                {/* <LatestRegisteredOne /> */}

                

              

            </section>

        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default DashBoardLayerOne