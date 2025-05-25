import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col bg-[#1f202b] text-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="text-[16px] flex flex-wrap gap-2 items-center mb-4 text-stone-300">
        <Link to="/" className="font-semibold hover:text-[#ff5722]">
          Home
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <Link to="/view-my-auctions" className="font-semibold hover:text-[#ff5722]">
          My Auctions
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <p className="text-stone-500">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-6 2xl:flex-row">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col gap-5 bg-[#2b2c3b] rounded-xl p-6 shadow-lg">
            <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start">
              <div className="w-full lg:w-40 lg:h-40 rounded-lg overflow-hidden border border-stone-600">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  {auctionDetail.title}
                </h3>
                <p className="text-lg text-stone-400">
                  Condition: <span className="text-[#ff5722] font-semibold">{auctionDetail.condition}</span>
                </p>
                <p className="text-lg text-stone-400">
                  Minimum Bid: <span className="text-[#ff5722] font-semibold">Rs.{auctionDetail.startingBid}</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xl font-bold mb-2 text-white">Auction Item Description</h4>
              <hr className="border-t border-stone-600 mb-2" />
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((desc, idx) => (
                  <li key={idx} className="text-[17px] text-stone-300 leading-relaxed mb-1">
                    {desc}
                  </li>
                ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 bg-[#2b2c3b] rounded-xl shadow overflow-hidden">
            <header className="bg-[#3a3b4d] py-4 text-xl font-semibold text-center text-white">
              BIDS
            </header>
            <div className="px-4 py-2 min-h-[300px] lg:min-h-[650px]">
              {auctionBidders &&
              auctionBidders.length > 0 &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.map((element, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-stone-700 py-3"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={element.profileImage}
                        alt={element.userName}
                        className="w-12 h-12 rounded-full object-cover hidden md:block border border-stone-500"
                      />
                      <p className="text-lg font-semibold text-white">{element.userName}</p>
                    </div>
                    <p className="flex-1 text-center text-[18px] font-medium text-stone-300">
                      Rs. {element.amount}
                    </p>
                    <p
                      className={`text-[18px] font-bold flex-1 text-end ${
                        index === 0
                          ? "text-green-400"
                          : index === 1
                          ? "text-blue-400"
                          : index === 2
                          ? "text-yellow-400"
                          : "text-stone-400"
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
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="w-full max-h-[650px] object-contain rounded-lg"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="w-full max-h-[650px] object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetails;
