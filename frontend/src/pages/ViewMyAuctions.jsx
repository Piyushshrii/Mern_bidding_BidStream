import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen bg-[#1f202b] text-white px-5 pt-24 pb-10 lg:pl-[320px] transition-all duration-300 ease-in-out">
      <h1 className="text-[#ff5c35] text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
        My Auctions
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <div
          className={`${
            myAuctions.length > 2 && "flex-grow"
          } flex flex-wrap gap-6`}
        >
          {myAuctions.length > 0 ? (
            myAuctions.map((element) => (
              <CardTwo
                title={element.title}
                startingBid={element.startingBid}
                endTime={element.endTime}
                startTime={element.startTime}
                imgSrc={element.image?.url}
                id={element._id}
                key={element._id}
              />
            ))
          ) : (
            <h3 className="text-gray-400 text-xl sm:text-2xl mt-6 font-medium">
              You have not posted any auction.
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMyAuctions;
