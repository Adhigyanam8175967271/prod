import React from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";

import Breadcrumb from "../../components/Breadcrumb";

import BlankPageLayer from "../../components/BlankPageLayer";

const DashBoardLayerOne = () => {

    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Home' />

        {/* BlankPageLayer */}
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default DashBoardLayerOne