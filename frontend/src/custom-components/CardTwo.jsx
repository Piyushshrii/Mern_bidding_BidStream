import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="basis-full bg-[#2a2b38] text-white rounded-xl shadow-lg group sm:basis-56 lg:basis-60 2xl:basis-80 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="px-4 pt-4 pb-5">
          <h5 className="font-bold text-lg group-hover:text-[#ff5c35] mb-2">
            {title}
          </h5>
          {startingBid && (
            <p className="text-gray-300 text-sm mb-1">
              Starting Bid:
              <span className="text-[#fdba88] font-semibold ml-2">
                {startingBid}
              </span>
            </p>
          )}
          <p className="text-gray-300 text-sm mb-4">
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#fdba88] font-semibold ml-2">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#fdba88] font-semibold ml-2">Time's up!</span>
            )}
          </p>
          <div className="flex flex-col gap-2">
            <Link
              className="bg-[#ff5c35] text-center text-white text-base px-4 py-2 rounded-md hover:bg-[#e6522f] transition"
              to={`/auction/details/${id}`}
            >
              View Auction
            </Link>
            <button
              className="bg-red-600 text-white text-base px-4 py-2 rounded-md hover:bg-red-700 transition"
              onClick={handleDeleteAuction}
            >
              Delete Auction
            </button>
            <button
              disabled={new Date(endTime) > Date.now()}
              onClick={() => setOpenDrawer(true)}
              className={`${
                new Date(endTime) > Date.now()
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700"
              } text-white text-base px-4 py-2 rounded-md transition`}
            >
              Republish Auction
            </button>
          </div>
        </div>
      </div>

      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default CardTwo;

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);

  const handleRepublishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed ${
        openDrawer && id ? "bottom-0" : "-bottom-full"
      } left-0 w-full transition-all duration-300 h-full bg-[#000000cc] flex items-end z-50`}
    >
      <div className="bg-[#2a2b38] text-white w-full sm:max-w-xl m-auto p-6 rounded-t-2xl shadow-2xl">
        <h3 className="text-2xl font-semibold text-center text-[#ff5c35] mb-2">
          Republish Auction
        </h3>
        <p className="text-gray-300 mb-6 text-sm text-center">
          Set a new start and end time to republish the auction with the same details.
        </p>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              Republish Auction Start Time
            </label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="py-2 px-3 bg-[#1f202b] text-white border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              Republish Auction End Time
            </label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="py-2 px-3 bg-[#1f202b] text-white border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleRepublishAuction}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 rounded-md mt-2"
          >
            {loading ? "Republishing..." : "Republish"}
          </button>
          <button
            type="button"
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg py-2 rounded-md"
            onClick={() => setOpenDrawer(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};
