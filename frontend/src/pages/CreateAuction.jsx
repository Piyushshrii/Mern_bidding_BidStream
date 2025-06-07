import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const containerRef = useRef(null); // Ref for animation

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          delay: 0.8,
          ease: "power3.out",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <article
      ref={containerRef}
      className="w-full ml-0 px-5 pt-20 lg:pl-[320px] flex flex-col bg-[#0e0f1a] min-h-screen text-white"
    >
      <h1 className="text-[#d6482b] text-4xl font-bold mb-6 text-center sm:text-left">
        Create Auction
      </h1>

      <div className="bg-[#1b1c2e] w-full max-w-4xl mx-auto px-6 py-8 rounded-xl shadow-lg">
        <form className="flex flex-col gap-6" onSubmit={handleCreateAuction}>
          <div>
            <p className="text-2xl font-semibold mb-4 text-center sm:text-left text-white">
              Auction Details
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-gray-300">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="py-2 px-2 bg-transparent border-b border-gray-600 text-white focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-gray-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="py-2 px-2 bg-[#1b1c2e] border-b border-gray-600 text-white focus:outline-none appearance-none"
                  required
                >
                  <option className="bg-[#1b1c2e] text-white" value="">
                    Select Category
                  </option>
                  {auctionCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#1b1c2e] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-300">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="py-2 px-2 bg-[#1b1c2e] border-b border-gray-600 text-white focus:outline-none appearance-none"
                required
              >
                <option className="bg-[#1b1c2e] text-white" value="">
                  Select Condition
                </option>
                <option className="bg-[#1b1c2e] text-white" value="New">
                  New
                </option>
                <option className="bg-[#1b1c2e] text-white" value="Used">
                  Used
                </option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-300">Starting Bid</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="py-2 px-2 bg-transparent border-b border-gray-600 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="p-2 bg-transparent border border-gray-600 text-white focus:outline-none rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-300">Auction Starting Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="py-2 px-2 bg-transparent border-b border-gray-600 text-white w-full focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-gray-300">Auction End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="py-2 px-2 bg-transparent border-b border-gray-600 text-white w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xl font-semibold mb-2 text-white">
              Auction Item Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-[#14151f] hover:bg-[#1a1b28] transition"
              >
                <div className="flex flex-col items-center justify-center p-6">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-44 h-auto rounded-lg shadow-md"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-sm text-gray-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        SVG, PNG, JPG, GIF (max 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={imageHandler}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#d6482b] hover:bg-[#e85c3d] text-white font-semibold text-xl py-2 rounded-md transition w-full mt-6"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </article>
  );
};

export default CreateAuction;
