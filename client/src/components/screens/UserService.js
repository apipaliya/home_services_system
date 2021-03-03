import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carpenter from "./Carpenter";
import UserNavBar from "./UserNavbar";
import Footer from "../Footer";

const UserService = () => {
  const [professionals, setProfessionals] = useState([
    {
      name: "",
      address: "",
      charge: "",
      profession: "",
      city: "",
    },
  ]);

  useEffect(() => {
    fetch("/professionals", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((datadetail) => {
        if (datadetail.error) {
          console.log(datadetail.error);
        } else {
          console.log(datadetail);
          setProfessionals(datadetail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <UserNavBar />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
              HELPING HANDS AT HOME
            </h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
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
                    to="/carpenter"
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
                  <Link
                    className="mt-3 text-blue-500 inline-flex items-center "
                    to="/electrician"
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
                    to="/plumber"
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
                    to="/pestcontrol"
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
  );
};

export default UserService;