import React, { useState, useEffect } from 'react'
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import { auto } from '@popperjs/core';
const UnitCountOne = () => {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);
    const [count5, setCount5] = useState(0);
    const [count6, setCount6] = useState(0);

    const [count7, setCount7] = useState(0);
    const [count8, setCount8] = useState(0);
    const [count9, setCount9] = useState(0);
    const [count10, setCount10] = useState(0);
    const [count11, setCount11] = useState(0);
     const [count12, setCount12] = useState(0);
      const [count13, setCount13] = useState(0);
       const [count14, setCount14] = useState(0);
        const [count15, setCount15] = useState(0);
         const [count16, setCount16] = useState(0);
           const [count17, setCount17] = useState(0);
            const [count18, setCount18] = useState(0);
            const [count19, setCount19] = useState(0);
             const [count20, setCount20] = useState(0);
              const [count21, setCount21] = useState(0);
  
    useEffect(() => {
      const fetchCount = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countPbanners"); // Adjust URL if needed
          setCount(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount1 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countSbanners"); // Adjust URL if needed
          setCount1(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount2 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countObanners"); // Adjust URL if needed
          setCount2(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount3 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countHcategory"); // Adjust URL if needed
          setCount3(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount4 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countBcategory"); // Adjust URL if needed
          setCount4(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount5 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countAcategory"); // Adjust URL if needed
          setCount5(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount6 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countAscategory"); // Adjust URL if needed
          setCount6(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount7 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countBarticles"); // Adjust URL if needed
          setCount7(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount8 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countTestimonials"); // Adjust URL if needed
          setCount8(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount9 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countPredictions"); // Adjust URL if needed
          setCount9(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount10 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countAstrologers"); // Adjust URL if needed
          setCount10(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount11 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countCustomers"); // Adjust URL if needed
          setCount11(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

       const fetchCount12 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countCourses"); // Adjust URL if needed
          setCount12(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

       const fetchCount13 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countCourseCategories"); // Adjust URL if needed
          setCount13(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

       const fetchCount14 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countCourseSubCategories"); // Adjust URL if needed
          setCount14(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount15 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countbauthors"); // Adjust URL if needed
          setCount15(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount16 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countTestimonialspending"); // Adjust URL if needed
          setCount16(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };

      const fetchCount17 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countSupport"); // Adjust URL if needed
          setCount17(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };
      const fetchCount18 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countWebroutes"); // Adjust URL if needed
          setCount18(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };
       const fetchCount19 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countfaq"); // Adjust URL if needed
          setCount19(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };
       const fetchCount20 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countHelp"); // Adjust URL if needed
          setCount20(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };
      const fetchCount21 = async () => {
        try {
          const response = await axios.get("https://adhigyanam-e92bf1bbbdb1.herokuapp.com/countPromo"); // Adjust URL if needed
          setCount21(response.data.count);
        } catch (err) {
          console.error("Error fetching count:", err);
        }
      };
  
      fetchCount();
      fetchCount1();
      fetchCount2();
      fetchCount3();
      fetchCount4();
      fetchCount5();
      fetchCount6();
      fetchCount7();
      fetchCount8();
      fetchCount9();
      fetchCount10();
      fetchCount11();
      fetchCount12();
      fetchCount13();
      fetchCount14();
      fetchCount15();
      fetchCount16();
      fetchCount17();
      fetchCount18();
       fetchCount19();
        fetchCount20();
        fetchCount21();
    }, []); // Runs only once on component mount
    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
         <div className="col">
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/webroutes'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Web Routes
                                </p>
                                <h6 className="mb-0">{count18}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/help'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">User Support Requests</p>
                                <h6 className="mb-0">{count20}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardsupport'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Support Requests</p>
                                <h6 className="mb-0">{count17}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardfeedbacks'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Testimonial Requests</p>
                                <h6 className="mb-0">{count16}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardmt'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Testimonials</p>
                                <h6 className="mb-0">{count8}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/faq'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    FAQs
                                </p>
                                <h6 className="mb-0">{count19}</h6>
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
                <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardala'>
                    <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Listed Astrolgers</p>
                                <h6 className="mb-0">{count10}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardmru'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Registered Users
                                </p>
                                <h6 className="mb-0">{count11}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardbc'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Blog Categories
                                </p>
                                <h6 className="mb-0">{count4}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardbauthors'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Blog Authors
                                </p>
                                <h6 className="mb-0">{count15}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardbb'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Blog Articles</p>
                                <h6 className="mb-0">{count7}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardpb'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Primary Banners</p>
                                <h6 className="mb-0">{count}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardsb'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Secondary Banners</p>
                                <h6 className="mb-0">{count1}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardob'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Offer Banners
                                </p>
                                <h6 className="mb-0">{count2}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardms'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Astro Services
                                </p>
                                <h6 className="mb-0">{count5}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardmss'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Astro Sub Services</p>
                                <h6 className="mb-0">{count6}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardhc'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Horoscope Categories</p>
                                <h6 className="mb-0">{count3}</h6>
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardhp'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Horoscope Predictions
                                </p>
                                <h6 className="mb-0">{count9}</h6>
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
                <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardcoursecategory'>
                    <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Course Categories</p>
                                <h6 className="mb-0">{count13}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:document-text-outline"
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
                <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardcoursesubcategory'>
                    <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Course Sub Categories</p>
                                <h6 className="mb-0">{count14}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:document-text-outline"
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
                <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/dashboardcourses'>
                    <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">Courses</p>
                                <h6 className="mb-0">{count12}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:document-text-outline"
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
            <div className="card shadow-none border bg-gradient-start-1" style={{height:auto}}>
                <NavLink to='/promocodesuser'>
                <div className="card-body" style={{padding:"5px 10px"}}>
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-0">
                                    Promocodes
                                </p>
                                <h6 className="mb-0">{count21}</h6>
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
        </div>
        

    )
}

export default UnitCountOne