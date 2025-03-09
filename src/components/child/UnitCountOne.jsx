import React from 'react'
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
const UnitCountOne = () => {
    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100">
                <NavLink to='/dashboardame'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Listed Astrolgers</p>
                                <h6 className="mb-0">03</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="gridicons:multiple-users"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100">
                <NavLink to='/dashboardmru'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Registered Users
                                </p>
                                <h6 className="mb-0">15</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                            <Icon
                                    icon="gridicons:multiple-users"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 h-100">
                <NavLink to='/dashboardbc'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Blog Categories
                                </p>
                                <h6 className="mb-0">05</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="simple-line-icons:vector"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 h-100">
                <NavLink to='/dashboardbla'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Blog Articles</p>
                                <h6 className="mb-0">12</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="simple-line-icons:vector"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-5 h-100">
                <NavLink to='/dashboardmt'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Testimonials</p>
                                <h6 className="mb-0">10</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="bi:chat-dots"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-5 h-100">
                <NavLink to='/dashboardpb'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Primary Banners</p>
                                <h6 className="mb-0">10</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:gallery-wide-linear"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 h-100">
                <NavLink to='/dashboardsb'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Secondary Banners</p>
                                <h6 className="mb-0">12</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:gallery-wide-linear"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 h-100">
                <NavLink to='/dashboardob'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Offer Banners
                                </p>
                                <h6 className="mb-0">05</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:gallery-wide-linear"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100">
                <NavLink to='/dashboardms'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Core Services
                                </p>
                                <h6 className="mb-0">15</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-orange rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="mingcute:storage-line"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100">
                <NavLink to='/dashboardmss'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Sub Services</p>
                                <h6 className="mb-0">20</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-orange rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="mingcute:storage-line"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100">
                <NavLink to='/bashboardhc'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Horoscope Categories</p>
                                <h6 className="mb-0">20</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-yellow rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fe:vector"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100">
                <NavLink to='/dashboardhla'>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Horoscope Predictions
                                </p>
                                <h6 className="mb-0">15</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-yellow rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fe:vector"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                    </NavLink>
                </div>
                {/* card end */}
            </div>
        </div>
        

    )
}

export default UnitCountOne