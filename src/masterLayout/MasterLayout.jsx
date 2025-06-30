import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";

import { Button } from "reactstrap"
import {useCookies } from 'react-cookie';

const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount

   

    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(['token']);
  const myCookieValue = cookies.token;

function logout() {
  removeCookie('token');
  setIsAuthenticated(false);
  window.location.href = "/loggedout";
}

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type='button'
          className='sidebar-close-btn'
        >
          <Icon icon='radix-icons:cross-2' />
        </button>
        <div>
          <Link to='/dashboard' className='sidebar-logo'>
            <img
              src='https://cms.adhigyanam.com/siteimages/logo.png'
              alt='site logo'
              className='light-logo'
            />
            <img
              src='https://cms.adhigyanam.com/siteimages/logowhite.png'
              alt='site logo'
              className='dark-logo'
            />
            <img
              src='https://cms.adhigyanam.com/siteimages/favicon.png'
              alt='site logo'
              className='logo-icon'
            />
          </Link>
        </div>
        <div className='sidebar-menu-area'>
          <ul className='sidebar-menu' id='sidebar-menu'>
           

        
             <li className='dropdown'>
              <Link to='#'>
             <Icon icon='solar:document-text-outline' className='menu-icon' />
                <span>Dashboard</span>
              </Link>
              <ul className='sidebar-submenu'>
              
               
                <li>
                  <NavLink
                    to='/dashboard'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Home
                  </NavLink>
                </li>
                
                <li>
                  <NavLink
                    to='/webroutes'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Web Routes
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to='/dashboardmru'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Registered Users
                  </NavLink>
                </li>
                 
                 <li>
                  <NavLink
                    to='/dashboardfeedbacks'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                   Testimonial Requests
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to='/dashboardsupport'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                   Support Requests
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to='/dashboardmt'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Testimonials
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/faq'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    FAQs
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to='/dashboardpolicies'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Policies
                  </NavLink>
                </li>
              </ul>
            </li>
           
        
            <li className='dropdown'>
              <Link to='#'>
              <i class="ri-user-settings-line text-xl me-6 d-flex w-auto"></i>
                <span>Astrolgers</span>
              </Link>
              <ul className='sidebar-submenu'>
              
               
                <li>
                  <NavLink
                    to='/dashboardala'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    All Astrologers
                  </NavLink>
                </li>
                
                <li>
                  <NavLink
                    to='/dashboardal'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Languages
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardacn'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Reg. Requests
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='fe:vector' className='menu-icon' />
                <span>Horoscopes</span>
              </Link>
              
              <ul className='sidebar-submenu'>
              
               
                <li>
                  <NavLink
                    to='/dashboardhc'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardhp'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Predictions
                  </NavLink>
                </li>
               
              </ul>
            </li>

              
               <li className='dropdown'>
              <Link to='#'>
              <Icon icon='solar:gallery-wide-linear' className='menu-icon' />
                <span>Display Banners</span>
              </Link>
              <ul className='sidebar-submenu'>
              
               
                <li>
                  <NavLink
                    to='/dashboardpb'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Primary Banners
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardsb'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Secondary Banners
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardob'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Offer Banners
                  </NavLink>
                </li>
              </ul>
            </li>

           
        

              
               <li className='dropdown'>
              <Link to='#'>
                <Icon icon='simple-line-icons:vector' className='menu-icon' />
                <span>Blog</span>
              </Link>
              <ul className='sidebar-submenu'>
              
               
                <li>
                  <NavLink
                    to='/dashboardbc'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Categories
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to='/dashboardbauthors'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Authors
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardbb'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Blogs
                  </NavLink>
                </li>
              </ul>
            </li>

            
 <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:document-text-outline' className='menu-icon' />
                <span>Courses</span>
              </Link>
              <ul className='sidebar-submenu'>
              
               
                <li>
                  <NavLink
                    to='/dashboardcoursecategory'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Course Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardcoursesubcategory'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                   Sub Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardcreatecourse'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                     Create Course
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardcourses'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Listed Courses
                  </NavLink>
                </li>
              </ul>
            </li>
            
             <li className='dropdown'>
              <Link to='#'>
                <Icon icon='mingcute:storage-line' className='menu-icon' />
                <span>Consultation</span>
              </Link>
              <ul className='sidebar-submenu'>
              
               
                <li>
                  <NavLink
                    to='/dashboardms'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' />{" "}
                    Astro Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/dashboardmss'
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' />{" "}
                    Astro Sub Services
                  </NavLink>
                </li>
               
               
              </ul>
            </li>
            

           

            

          

            
          </ul>
        </div>
      </aside>

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className='navbar-header'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-4'>
                <button
                  type='button'
                  className='sidebar-toggle'
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon='iconoir:arrow-right'
                      className='icon text-2xl non-active'
                    />
                  ) : (
                    <Icon
                      icon='heroicons:bars-3-solid'
                      className='icon text-2xl non-active '
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type='button'
                  className='sidebar-mobile-toggle'
                >
                  <Icon icon='heroicons:bars-3-solid' className='icon' />
                </button>
               
              </div>
            </div>
            <div className='col-auto'>
              <div className='d-flex flex-wrap align-items-center gap-3'>
                {/* ThemeToggleButton */}
                <ThemeToggleButton />
               
                {/* Notification dropdown end */}
                <div className='dropdown'>
                  <button
                    className='d-flex justify-content-center align-items-center rounded-circle'
                    type='button'
                    data-bs-toggle='dropdown'
                  >
                    <img
                      src='https://cms.adhigyanam.com/siteimages/favicon.png'
                      alt='image_user'
                      className='w-40-px h-40-px object-fit-cover rounded-circle'
                    />
                  </button>
                  <div className='dropdown-menu to-top dropdown-menu-sm'>
                    <div className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                      <div>
                        <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                        Sauntesthyam LLP
                        </h6>
                        <span className='text-secondary-light fw-medium text-sm'>
                        {myCookieValue}
                        </span>
                      </div>
                      <button type='button' className='hover-text-danger'>
                        <Icon
                          icon='radix-icons:cross-1'
                          className='icon text-xl'
                        />
                      </button>
                    </div>
                    <ul className='to-top-list'>
                      
                     
                      <li>
                        <Link
                          className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                          to='/dashboardsc'
                        >
                          <Icon
                            icon='icon-park-outline:setting-two'
                            className='icon text-xl'
                          />
                          Credentials
                        </Link>
                      </li>
                      <li>
                       
                        <Button  className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3' type="submit" onClick={logout}>
                        <Icon icon='lucide:power' className='icon text-xl' />{" "}
                        Log Out
                                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className='dashboard-main-body'>{children}</div>

        {/* Footer section */}
        <footer className='d-footer'>
          <div className='row align-items-center justify-content-between'>
            <div className='col-auto'>
              <p className='mb-0' style={{fontSize:"13px"}}>© 2025 <span className='text-primary-600' style={{fontWeight:"bold"}}>Sauntesthyam LLP</span>. All Rights Reserved.</p>
            </div>
            <div className='col-auto'>
              <p className='mb-0' style={{fontSize:"13px"}}>
                Website at <span className='text-primary-600' style={{fontWeight:"bold"}}>Adhigyanam.com</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
