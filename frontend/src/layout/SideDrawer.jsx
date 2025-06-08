import React, { useState, useLayoutEffect, useRef } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaUserCircle, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";import { motion, AnimatePresence } from "framer-motion"; 
import '../assets/fonts/fonts.css'; // Ensure you have the correct path to your CSS file



const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState("#D6482B"); // Default color

  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeRef = useRef(null);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(drawerRef.current, { x: -300 });

      gsap.to(drawerRef.current, {
        x: 0,
        duration: 1.8,
        ease: "expo.out",
        delay: 2,
      });

      gsap.from(hamburgerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 2.2,
        ease: "expo.out",
      });
    }, drawerRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (show) {
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    } else {
      gsap.to(drawerRef.current, {
        x: -300,
        duration: 0.6,
        ease: "expo.in",
      });
    }
  }, [show]);

  const slideTransition = (path, color = "#D6482B") => {
    setTransitionColor(color);
    setTransitioning(true);
    setTimeout(() => {
      navigate(path);
      setTransitioning(false);
    }, 1300); // increased from 800ms to 1300ms (0.5s more)
  };

  const handleRedirect = (path, color) => {
    setShow(false);
    slideTransition(path, color);
  };

  return (
    <>
      {/* Hamburger */}
      <div
        ref={hamburgerRef}
        onClick={() => setShow(true)}
        className="fixed right-5 top-5 bg-[#D6482B] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden z-50 cursor-pointer"
      >
        <GiHamburgerMenu />
      </div>

      {/* Transition Layer */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.3, ease: "easeInOut" }} // increased duration here too
            className="fixed top-0 left-0 w-full h-full z-[100] pointer-events-none flex items-center justify-center"
            style={{ backgroundColor: transitionColor }}
          >
            <h1 className="text-white text-7xl font-extrabold select-none user-select-none tracking-wide uppercase">
              Bid Stream
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="w-[100%] sm:w-[300px] bg-[#f5efe6] h-full fixed top-0 left-0 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-stone-500 z-40"
      >
        <div className="relative">
          <Link to={"/"}>
            <h4 className="text-3xl font-bold mb-4 tracking-tight leading-none">
              <span className="text-gray-950 font-azonix">Bid</span>
              <span className="bg-gradient-to-r from-[#ff5722] to-[#D6482b] bg-clip-text text-transparent font-azonix">
                Stream
              </span>
            </h4>
          </Link>

          <ul className="flex flex-col gap-3">
            <li>
              <button
                onClick={() => handleRedirect("/auctions")}
                className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
              >
                <RiAuctionFill /> Auctions
              </button>
            </li>
            <li>
              <button
                onClick={() => handleRedirect("/leaderboard", "#D6482B")}
                className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
              >
                <MdLeaderboard /> Leaderboard
              </button>
            </li>

            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li>
                  <button
                    onClick={() => handleRedirect("/submit-commission")}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleRedirect("/create-auction")}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
                  >
                    <IoIosCreate /> Create Auction
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleRedirect("/view-my-auctions")}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
                  >
                    <FaEye /> View My Auctions
                  </button>
                </li>
              </>
            )}

            {isAuthenticated && user?.role === "Super Admin" && (
              <li>
                <button
                  onClick={() => handleRedirect("/dashboard")}
                  className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
                >
                  <MdDashboard /> Dashboard
                </button>
              </li>
            )}
          </ul>

          {!isAuthenticated ? (
            <div className="my-4 flex gap-2">
              <button
                onClick={() => handleRedirect("/sign-up")}
                className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] text-xl py-1 px-4 rounded-md text-white"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleRedirect("/login")}
                className="text-[#DECCBE] border-[#DECCBE] border-2 hover:bg-[#fffefd] hover:text-[#fdba88] font-bold text-xl py-1 px-4 rounded-md"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="my-4 flex gap-4 w-fit">
              <button
                onClick={handleLogout}
                className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] text-xl py-1 px-4 rounded-md text-white"
              >
                Logout
              </button>
            </div>
          )}

          <hr className="mb-4 border-t-[#d6482b]" />
          <ul className="flex flex-col gap-3">
            {isAuthenticated && (
              <li>
                <button
                  onClick={() => handleRedirect("/me")}
                  className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
                >
                  <FaUserCircle /> Profile
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => handleRedirect("/how-it-works-info")}
                className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
              >
                <SiGooglesearchconsole /> How it works
              </button>
            </li>
            <li>
              <button
                onClick={() => handleRedirect("/about")}
                className="flex text-xl font-semibold gap-2 items-center hover:text-[#D6482b]"
              >
                <BsFillInfoSquareFill /> About Us
              </button>
            </li>
          </ul>

          <IoMdCloseCircleOutline
            ref={closeRef}
            onClick={() => setShow(false)}
            className="absolute top-0 right-4 text-[28px] sm:hidden cursor-pointer"
          />
        </div>

        <div>
          <div className="flex gap-2 items-center mb-2">
            <a
              href="https://www.linkedin.com/in/piyush-shrivastava-858a61253"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-stone-500 p-2 text-xl rounded-sm hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/piyush.shrii?igsh=eHJzeHBjY2Zqbml3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-stone-500 p-2 text-xl rounded-sm hover:text-pink-500"
            >
              <RiInstagramFill />
            </a>
          </div>
          <Link to={"/contact"} className="text-stone-500 font-semibold hover:text-[#d6482b]">
            Contact Us
          </Link>
          <p className="text-stone-500">&copy; Bid Stream, LLC.</p>
          <p className="text-stone-500">
            Designed By{" "}
            <Link to={"/"} className="font-semibold hover:text-[#d6482b]">
              Piyush Shrivastava
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
