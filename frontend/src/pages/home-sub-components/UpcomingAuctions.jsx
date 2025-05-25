import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="my-8 px-4 md:px-8">
      <h3 className="text-white text-2xl md:text-3xl font-semibold mb-6">
        Auctions For Today
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Info Banner Card */}
        <div className="bg-[#0F111A] p-6 rounded-lg flex flex-col justify-between shadow-md">
          <span className="rounded-full bg-[#fdba88] text-white w-fit p-3 text-xl">
            <RiAuctionFill />
          </span>
          <div className="mt-6">
            <h3 className="text-[#fdba88] text-2xl font-bold">Auctions For</h3>
            <h3 className="text-white text-2xl font-bold">Today</h3>
          </div>
        </div>

        {/* Auction Cards */}
        {auctionsStartingToday.length > 0 ? (
          auctionsStartingToday.map((element) => (
            <Link
              to={`/auction/item/${element._id}`}
              key={element._id}
              className="bg-[#0F111A] text-white rounded-lg p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={element.image?.url}
                  alt={element.title}
                  className="w-16 h-16 rounded object-cover"
                />
                <p className="font-medium text-base">{element.title}</p>
              </div>

              <div className="flex justify-between text-sm text-gray-300">
                <span className="font-semibold">Starting Bid:</span>
                <span className="text-[#fdba88] font-semibold">
                  Rs. {element.startingBid}
                </span>
              </div>

              <div className="text-sm">
                <p className="text-gray-400 font-semibold">Starting Time</p>
                <p>{element.startTime}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No auctions starting today.
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingAuctions;
