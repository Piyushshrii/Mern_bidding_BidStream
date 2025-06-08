import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/fonts/fonts.css";

gsap.registerPlugin(ScrollTrigger);

const SplineScene = React.memo(() => (
  <div className="w-full h-full">
    <Spline scene="https://prod.spline.design/qf2R6RqcjQuWGYqD/scene.splinecode" />
  </div>
));

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    { title: "Win Notification", description: "Highest bidder receives a winning email." },
    { title: "Payment & Fees", description: "Bidder pays; auctioneer pays 5% fee." },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  const [showPrompt, setShowPrompt] = useState(false);
  const timeoutRef = useRef(null);

  // Refs for GSAP animation targets
  const logoRef = useRef(null);
  const headerRef = useRef();
  const heroTextRef = useRef();
  const ctaButtonsRef = useRef(null);
  const howItWorksRef = useRef();
  const howItWorksItemsRef = useRef([]);
  const splineRef = useRef();
  const splineContainerRef = useRef();
  const featuredRef = useRef();

  const handleHover = () => {
    if (!showPrompt) {
      setShowPrompt(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowPrompt(false), 5000);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
          duration: 0.9,
        },
      });

      // Logo intro animation: fade out and scale down
      tl.to(logoRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (logoRef.current) logoRef.current.style.display = "none";
        },
      });

      // Main homepage animation starts after logo fades out
      tl.fromTo(
        [
          headerRef.current,
          heroTextRef.current,
          ...(ctaButtonsRef.current ? Array.from(ctaButtonsRef.current.children) : []),
          howItWorksRef.current,
          ...howItWorksItemsRef.current,
          splineContainerRef.current,
          splineRef.current,
          featuredRef.current,
        ],
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
        },
        "+=0.2" // slight delay after logo animation
      );

      ScrollTrigger.create({
        trigger: ".upcoming-auctions-section",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".upcoming-auctions-section", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 });
        },
        once: true,
      });

      ScrollTrigger.create({
        trigger: ".leaderboard-section",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(".leaderboard-section", { y: 500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 });
        },
        once: true,
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      clearTimeout(timeoutRef.current);
    };
  }, [isAuthenticated]);

  return (
    <section className="w-full ml-0 min-h-screen px-4 py-12 lg:pl-[320px] flex flex-col gap-10 bg-[#1f202b] text-white relative overflow-hidden">
      {/* Intro Logo Animation */}
      <div
        ref={logoRef}
        className="fixed inset-0 bg-[#1f202b] z-50 flex items-center justify-center"
      >
        <h4 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none text-white font-azonix">
          <span className="text-white">Bid</span>
          <span className="bg-gradient-to-r from-[#ff5722] to-[#D6482b] bg-clip-text text-transparent">
            Stream
          </span>
        </h4>
      </div>

      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#fd6843] rounded-full blur-[150px] opacity-20 pointer-events-none z-0" />

      <div className="flex flex-col lg:flex-row gap-10 z-10 relative">
        <div className="flex flex-col gap-10 w-full lg:w-1/2 justify-center">
          <div>
            <p
              ref={headerRef}
              className="text-[#DECCBE] font-extrabold text-xl mb-4 tracking-wider uppercase drop-shadow-sm"
            >
              Transparency Leads to Your Victory
            </p>
            <div ref={heroTextRef} className="relative">
              <h1 className="text-white text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-6xl font-cornerstone drop-shadow-lg animate-shine">
                Transparent Auctions
              </h1>
              <h1 className="text-[#fd6843] text-2xl font-bold min-[480px]:text-4xl md:text-6xl xl:text-6xl font-cornerstone drop-shadow-md">
                Be The Winner
              </h1>
            </div>

            <div ref={ctaButtonsRef} className="flex flex-wrap gap-4 my-6">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/sign-up"
                    className="bg-[#fd6843] font-semibold hover:bg-[#e05730] rounded-md px-8 py-2 text-white text-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <span className="absolute left-0 top-0 w-full h-full bg-white opacity-10 group-hover:animate-ripple z-0" />
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
            <h3 ref={howItWorksRef} className="text-white text-xs font-bold md:text-2xl lg:text-3xl">
              How it works
            </h3>
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
              {howItWorks.map((element, index) => (
                <div
                  key={element.title}
                  ref={(el) => (howItWorksItemsRef.current[index] = el)}
                  className="bg-[#1C1C1F] flex flex-col gap-2 p-4 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[48%] 
                    hover:bg-[#b93c29] hover:text-white transition-all duration-300 shadow-md"
                >
                  <h5 className="font-bold">{element.title}</h5>
                  <p>{element.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="w-full lg:w-1/2 h-[calc(95vh-0.2rem)] overflow-hidden rounded-3xl border-t border-b border-gray-200 flex items-center justify-center relative cursor-pointer"
          onMouseEnter={handleHover}
          ref={splineContainerRef}
        >
          <div
            ref={splineRef}
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

          {showPrompt && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 pointer-events-none opacity-60">
              <span className="text-xl">🖐️</span> Move your mouse to play
            </div>
          )}
        </div>
      </div>

      <div ref={featuredRef} className="w-full z-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <FeaturedAuctions />
        </div>
      </div>

      <UpcomingAuctions className="upcoming-auctions-section" />
      <Leaderboard className="leaderboard-section" />
    </section>
  );
};

export default Home;
