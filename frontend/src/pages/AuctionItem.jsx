import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useRef, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    gsap.from(leftRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(rightRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    });
  }, [auctionDetail]);

  return (
    <section className="w-full h-full min-h-screen ml-0 m-0 px-5 pt-20 lg:pl-[320px] flex flex-col bg-[#0F111A] text-white">
      <div className="text-[16px] flex flex-wrap gap-2 items-center mb-4 text-gray-300">
        <Link
          to="/"
          className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
        >
          Home
        </Link>
        <FaGreaterThan className="text-gray-500" />
        <Link
          to={"/auctions"}
          className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
        >
          Auctions
        </Link>
        <FaGreaterThan className="text-gray-500" />
        <p className="text-gray-400">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Auction Info */}
          <div
            className="flex-1 flex flex-col gap-4 bg-[#1A1C26] rounded-2xl shadow-lg p-6"
            ref={leftRef}
          >
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="bg-[#1A1C26] w-full lg:w-40 lg:h-40 rounded-xl flex justify-center items-center p-4 overflow-hidden">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <div className="flex flex-col justify-around">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {auctionDetail.title}
                </h3>
                <p className="text-lg font-medium">
                  Condition:{" "}
                  <span className="text-[#D6482B] font-semibold">
                    {auctionDetail.condition}
                  </span>
                </p>
                <p className="text-lg font-medium">
                  Minimum Bid:{" "}
                  <span className="text-[#D6482B] font-semibold">
                    Rs.{auctionDetail.startingBid}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mt-4 mb-2 text-white">
                Auction Item Description
              </h4>
              <hr className="my-2 border-t border-stone-700" />
              <ul className="list-disc pl-5 text-base space-y-2 text-gray-300">
                {auctionDetail.description &&
                  auctionDetail.description
                    .split(". ")
                    .map((element, index) => (
                      <li key={index}>{element}</li>
                    ))}
              </ul>
            </div>
          </div>

          {/* Bids Section */}
          <div className="flex-1 flex flex-col gap-4" ref={rightRef}>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <header className="bg-[#1A1C26] py-4 px-4 text-2xl font-semibold text-white">
                BIDS
              </header>
              <div className="bg-[#232632] px-4 py-4 min-h-fit lg:min-h-[650px] rounded-b-2xl">
                {auctionBidders &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                  auctionBidders.length > 0 ? (
                    auctionBidders.map((element, index) => (
                      <div
                        key={index}
                        className="py-3 border-b border-stone-700 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={element.profileImage}
                            alt={element.userName}
                            className="w-12 h-12 rounded-full hidden md:block"
                          />
                          <p className="text-lg font-medium text-white">
                            {element.userName}
                          </p>
                        </div>
                        <p
                          className={`text-xl font-semibold ${
                            index === 0
                              ? "text-green-400"
                              : index === 1
                              ? "text-blue-400"
                              : index === 2
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        >
                          {index === 0
                            ? "1st"
                            : index === 1
                            ? "2nd"
                            : index === 2
                            ? "3rd"
                            : `${index + 1}th`}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No bids for this auction
                    </p>
                  )
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <img
                    src="/notStarted.png"
                    alt="not-started"
                    className="w-full rounded-xl"
                  />
                ) : (
                  <img
                    src="/auctionEnded.png"
                    alt="ended"
                    className="w-full rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* Bid Input */}
            <div className="bg-[#D6482B] py-4 px-4 rounded-2xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex gap-3 items-center">
                    <p className="text-white font-semibold text-lg">
                      Place Bid
                    </p>
                    <input
                      type="number"
                      className="w-32 p-2 rounded-md bg-white text-black focus:outline-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button
                    className="p-4 text-white bg-gray-950 rounded-full transition-all duration-300 hover:bg-[#222]"
                    onClick={handleBid}
                  >
                    <RiAuctionFill />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-white font-semibold text-lg text-center sm:text-left">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="text-white font-semibold text-lg text-center sm:text-left">
                  Auction has ended!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
