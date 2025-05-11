
import MasterLayout from "../../masterLayout/MasterLayout";
import BlankPageLayer from "../../components/BlankPageLayer";
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Button } from "reactstrap";
import axios from "axios";
import validationnew from '../../Validations/Field.js';


const Courses = () => {

    return (
      <>
      {/* MasterLayout */}
      <MasterLayout>
        <p className="mb-12 text-secondary-light" style={{fontSize:"15px"}}>
                                          <b>You are here</b>: <NavLink to="/dashboard" style={{color:'blueviolet', textDecoration:"underline"}}>Dashboard</NavLink> | Listed Courses
                                      </p>
             <section className="auth forgot-password-page bg-base d-flex flex-wrap">

             </section>
        <BlankPageLayer />
      </MasterLayout>
    </>


    )
}

export default Courses