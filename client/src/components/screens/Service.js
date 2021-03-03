import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Navbar";
import Footer from "../Footer";

const Service = () => {
  return (
    <>
      <NavBar />

      {/* <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -mx-4 -mb-10 text-center">
                <div className="sm:w-4/5 mx-auto flex flex-wrap">
                  <img
                    alt="ecommerce"
                    className="sm:w-1/2 w-full sm:h-auto h-64 object-cover object-center rounded"
                    src={shop.image}
                    height="400"
                    width="400"
                  />
                  <div className="sm:w-1/2 w-full sm:pl-10 sm:py-6 mt-6 sm:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      BRAND NAME
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      The Catcher in the Rye
                    </h1>
                    <div class="flex mb-4">
                      <span class="flex items-center">
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-blue-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-blue-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-blue-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-blue-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-blue-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span class="text-gray-600 ml-3">4 Reviews</span>
                      </span>
                    </div>
                    <p className="leading-relaxed">
                      Fam locavore kickstarter distillery. Mixtape chillwave
                      tumeric sriracha taximy chia microdosing tilde DIY. XOXO
                      fam indxgo juiceramps cornhole raw denim forage brooklyn.
                      Everyday carry +1 seitan poutine tumeric. Gastropub blue
                      bottle austin listicle pour-over, neutra jean shorts
                      keytar banjo tattooed umami cardigan.
                    </p>

                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        $58.00
                      </span>
                      <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
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
      <Footer />
    </>
  );
};

export default Service;
