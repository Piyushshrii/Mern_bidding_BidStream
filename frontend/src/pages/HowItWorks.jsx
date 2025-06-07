import React, { useLayoutEffect, useRef } from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";
import gsap from "gsap";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Proof of Payment",
      description:
        "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
    },
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
    },
  ];

  const stepsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(stepsRef.current, { opacity: 0, x: 1500 });

      // Timeline to animate each box one after another
      const tl = gsap.timeline();
      stepsRef.current.forEach((el) => {
        tl.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full min-h-screen bg-[#0e0f1a] text-white px-5 pt-24 lg:pl-[320px] flex flex-col py-4">
      <h1 className="text-[#d6482b] text-3xl sm:text-4xl md:text-6xl font-bold mb-8">
        Discover How BidStream Operates
      </h1>
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (stepsRef.current[index] = el)}
            className="bg-[#1c1d2a] border border-[#2a2b3c] rounded-lg p-5 flex flex-col gap-4 transition-all duration-300 group hover:rounded-none hover:bg-[#d6482b] hover:text-[#0e0f1a] hover:border-white"
          >
            <div className="bg-[#d6482b] text-white p-3 text-xl rounded-full w-fit transition-all duration-300 group-hover:bg-white group-hover:text-[#0e0f1a]">
              {step.icon}
            </div>
            <h3 className="text-[#d6482b] text-2xl font-semibold transition-all duration-300 group-hover:text-[#0e0f1a]">
              {step.title}
            </h3>
            <p className="text-lg text-gray-300 group-hover:text-[#0e0f1a] transition-all duration-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
