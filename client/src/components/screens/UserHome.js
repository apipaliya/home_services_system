import React from "react";
import UserNavBar from "./UserNavbar";
import {Link} from "react-router-dom";
import { MDBCard, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import Footer from "../Footer";


const UserHome = () => {
  return (
    <>
    <UserNavBar/>
    
    <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img className="object-cover object-center rounded" alt="home-service" src="https://res.cloudinary.com/hhah/image/upload/v1614401480/home_eos1jk.jpg" />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h4>HELPING HANDS AT HOME</h4>
                        <br />
                        <h1 className="title-font sm:text-3xl text-3xl mb-4 font-medium text-gray-900">Quality Home Services, On Demand</h1>
                        <p className="mb-8 leading-relaxed">Experianced, Hand-picked Professionals to serve you at doorstep</p>
                        <div className="flex w-full md:justify-start justify-center items-end">
                            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                                <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600 left">Where do you need a service?</label>
                                <input type="text" id="hero-field" name="hero-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-0.5 px-4 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-5 my-3 search-circl">search</button>
                       </div>
                    </div>
                </div>
            </section>

    {/* <MDBRow>
      <MDBCol md='4'>
        <MDBCard
          className='card-image'
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg')"
          }}
        >
          <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4'>
            <div>
              <h5 className='pink-text'>
                <MDBIcon icon='chart-pie' /> Marketing
              </h5>
              <MDBCardTitle tag='h3' className='pt-2'>
                <strong>This is card title</strong>
              </MDBCardTitle>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit
                officia accusamus minus error nisi architecto nulla ipsum
                dignissimos. Odit sed qui, dolorum!
              </p>
              <MDBBtn color='pink'>
                <MDBIcon icon='clone left' /> View project
              </MDBBtn>
            </div>
          </div>
        </MDBCard>
      </MDBCol>

      <MDBCol md='4'>
        <MDBCard
          className='card-image'
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/Horizontal/City/6-col/img%20(47).jpg')"
          }}
        >
          <div className='text-white text-center d-flex align-items-center rgba-indigo-strong py-5 px-4'>
            <div>
              <h5 className='orange-text'>
                <MDBIcon icon='desktop' /> Software
              </h5>
              <MDBCardTitle tag='h3' className='pt-2'>
                <strong>This is card title</strong>
              </MDBCardTitle>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit
                officia accusamus minus error nisi architecto nulla ipsum
                dignissimos. Odit sed qui, dolorum!
              </p>
              <MDBBtn color='deep-orange'>
                <MDBIcon icon='clone left' /> View project
              </MDBBtn>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
    </MDBRow> */}

<hr/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
              HELPING HANDS AT HOME
            </h2>
            <h1 className="sm:text-3xl text-5xl font-medium title-font mb-4 text-gray-900">
              Our Services
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              This platform is to make our urban lives more fulfilling to solve
              our needs in a clap. They want to be the go-to platform helping
              customers to complete the projects that are important to their
              lives. It enables users to find any service professional like.
            </p>
          </div>
          <div className="flex flex-wrap -m-12">
            <div className="p-10 md:w-1/2">
              <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src="https://res.cloudinary.com/hhah/image/upload/v1614625034/carpenter_gpsztf.jpg"
                />
                <div className="text-center relative z-10 w-full">
                  <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                    Carpenter
                  </h2>
                  <p className="leading-relaxed">
                    Skateboard +1 mustache fixie paleo lumbersexual.
                  </p>
                  <Link
                    className="mt-3 text-blue-500 inline-flex items-center"
                    to="/usercarpenter"
                  >
                    Explore
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-10 md:w-1/2">
              <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src="https://res.cloudinary.com/hhah/image/upload/v1614625031/electrician_bpdibc.jpg"
                />
                <div className="text-center relative z-10 w-full">
                  <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                    Electrician
                  </h2>
                  <p className="leading-relaxed">
                    Skateboard +1 mustache fixie paleo lumbersexual.
                  </p>
                  <Link className="mt-3 text-blue-500 inline-flex items-center " to="/userelectrician"
                    >
                    Explore
                    
                     <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-10 md:w-1/2">
              <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src="https://res.cloudinary.com/hhah/image/upload/v1614625031/plumber_sr5tnu.jpg"
                />
                <div className="text-center relative z-10 w-full">
                  <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                    Plumber
                  </h2>
                  <p className="leading-relaxed">
                    Skateboard +1 mustache fixie paleo lumbersexual.
                  </p>
                  <Link
                    className="mt-3 text-blue-500 inline-flex items-center"
                    to="/userplumber"
                  >
                    Explore
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-10 md:w-1/2">
              <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src="https://res.cloudinary.com/hhah/image/upload/v1614625031/pest-control-worker-spraying-pesticide-wooden-cabinet-woman-looking-male-149401048_e6yw5x.jpg"
                />
                <div className="text-center relative z-10 w-full">
                  <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                    Pest Control
                  </h2>
                  <p className="leading-relaxed">
                    Skateboard +1 mustache fixie paleo lumbersexual.
                  </p>
                  <Link
                    className="mt-3 text-blue-500 inline-flex items-center"
                    to="/userpestcontrol"
                  >
                    Explore
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     <Footer/>

    </>
  )
}

export default UserHome