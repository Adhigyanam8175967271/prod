import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { NavLink } from 'react-router-dom'

const LatestRegisteredOne = () => {
    return (
        <div className="col-xxl-12 col-xl-12">
            <div className="card h-100">
                <div className="card-body p-24">
                    <div className="d-flex flex-wrap align-items-center gap-1 justify-content-between mb-16">
                        <ul
                            className="nav border-gradient-tab nav-pills mb-0"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center active"
                                    id="pills-to-do-list-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-to-do-list"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-to-do-list"
                                    aria-selected="true"
                                >
                                     Appointments
                                    <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                                        00
                                    </span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center"
                                    id="pills-recent-leads-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-recent-leads"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-recent-leads"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Astrolgers
                                    <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                                        03
                                    </span>
                                </button>
                            </li>
                        </ul>
                        {/* <Link
                            to="#"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                        >
                            Create New
                            <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="icon"
                            />
                        </Link> */}
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-to-do-list"
                            role="tabpanel"
                            aria-labelledby="pills-to-do-list-tab"
                            tabIndex={0}
                        >
                            <div className="table-responsive scroll-sm">
                                <table className="table bordered-table sm-table mb-0">
                                    <thead>
                                        <tr>
                                        <th scope="col">ID</th>
                                            <th scope="col">Booking Details</th>
                                            <th scope="col">Appointment Details</th>
                                            <th scope="col">Astrolger Details</th>
                                            <th scope="col" className="text-center">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="d-flex align-items-center" style={{width:"100%", textAlign:'center', backgroundColor:"#fafafa"}}>
                                                <img src='siteimages/calendar.jpeg' alt='' style={{margin:"auto", padding:"auto"}} />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-recent-leads"
                            role="tabpanel"
                            aria-labelledby="pills-recent-leads-tab"
                            tabIndex={0}
                        >
                            <div className="table-responsive scroll-sm">
                                <table className="table bordered-table sm-table mb-0">
                                    <thead>
                                        <tr>
                                        <th scope="col">Full Name</th>
                                            <th scope="col">Registered On</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Contact No.</th>
                                            <th scope="col" className="text-left">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="assets/images/users/user1.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0 fw-medium">
                                                            Arjun Chaudhary
                                                        </h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            arjun@adhigyanam.com
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>27 Mar 2024</td>
                                            <td>Full Time</td>
                                            <td>91-1234567890</td>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0 fw-medium">
                                                            Activated
                                                        </h6>
                                                        <NavLink className="text-sm text-secondary-light fw-medium">
                                                            Manage Profile
                                                        </NavLink>
                                                    </div>
                                                </div>
                                                </td>
                                            {/* <td className="text-center">
                                                <span className="bg-success text-light px-24 py-4 rounded-pill fw-medium text-sm">
                                                    Activated
                                                </span>
                                            </td> */}
                                        </tr>
                                    <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="assets/images/users/user1.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0 fw-medium">
                                                            Saurabh Singh
                                                        </h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            saurabhnet.0907@gmail.com
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>01 Mar 2024</td>
                                            <td>Full Time</td>
                                            <td>91-4564564567</td>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0 fw-medium">
                                                            Suspended
                                                        </h6>
                                                        <NavLink className="text-sm text-secondary-light fw-medium">
                                                            Manage Profile
                                                        </NavLink>
                                                    </div>
                                                </div>
                                                </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="assets/images/users/user1.png"
                                                        alt=""
                                                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0 fw-medium">
                                                            Rishabh Jain
                                                        </h6>
                                                        <span className="text-sm text-secondary-light fw-medium">
                                                            mrjain20@gmail.com
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>01 July 2024</td>
                                            <td>Part Time</td>
                                            <td>91-1231231230</td>
                                            <td>
                                            <div className="d-flex align-items-center">
                                                
                                                    <div className="flex-grow-1">
                                                        <h6 className="text-md mb-0 fw-medium">
                                                            Deactivated
                                                        </h6>
                                                        <NavLink className="text-sm text-secondary-light fw-medium">
                                                            Manage Profile
                                                        </NavLink>
                                                    </div>
                                                </div>
                                                </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestRegisteredOne