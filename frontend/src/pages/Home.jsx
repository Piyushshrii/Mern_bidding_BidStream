import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from "@/custom-components/Spinner";
import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";

const SplineScene = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    <Spline scene="https://prod.spline.design/qf2R6RqcjQuWGYqD/scene.splinecode" />
  </motion.div>
);

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className="w-full ml-0 min-h-screen px-4 py-12 lg:pl-[320px] flex flex-col gap-10 bg-[#1f202b] text-white">
      
      {/* Top Section: Left Content + Right Spline */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE - Content */}
        <div className="flex flex-col gap-10 w-full lg:w-1/2 justify-center">
          <div>
            <p className="text-[#DECCBE] font-semibold text-xl mb-4">
              Transparency Leads to Your Victory
            </p>
            <h1 className="text-white text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl">
              Transparent Auctions
            </h1>
            <h1 className="text-[#fd6843] text-2xl font-bold min-[480px]:text-4xl md:text-6xl xl:text-7xl">
              Be The Winner
            </h1>
            <div className="flex gap-4 my-6">
              {!isAuthenticated && (
                <>
                  <Link
  to="/sign-up"
  className="bg-[#fd6843] font-semibold hover:bg-[#e05730] rounded-md px-8 py-2 text-white text-xl transition-all duration-300"
>
  Sign Up
</Link>

                  <Link
                    to="/login"
                    className="text-white border-2 border-white hover:bg-white hover:text-[#0F0F11] font-bold text-xl rounded-md px-8 py-2 transition-all duration-300"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-white text-xl font-semibold md:text-2xl lg:text-3xl">
              How it works
            </h3>
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
              {howItWorks.map((element) => (
                <div
                  key={element.title}
                  className="bg-[#1C1C1F] flex flex-col gap-2 p-4 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[48%] 
                    hover:bg-[#b93c29] hover:text-white transition-all duration-300"
                >
                  <h5 className="font-bold">{element.title}</h5>
                  <p>{element.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Spline */}
        <div className="w-full lg:w-1/2 h-[calc(95vh-7rem)] overflow-hidden rounded-3xl border-t border-b border-gray-200 flex items-center justify-center relative">
          <div
            style={{
              transform: "scale(0.8) translateX(20px)",
              transformOrigin: "center",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <SplineScene />
          </div>
        </div>
      </div>

      {/* Featured Auctions - NOW IN GRID */}
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Auctions</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <FeaturedAuctions />
        </div>
      </div>

      {/* Upcoming & Leaderboard */}
      <UpcomingAuctions />
      <Leaderboard />
    </section>
  );
};

export default Home;
