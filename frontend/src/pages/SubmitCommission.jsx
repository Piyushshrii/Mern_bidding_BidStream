import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            delay: 0,
            ease: "power3.out",
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-[#1f202b] px-5 pt-20 lg:pl-[320px] flex flex-col items-center justify-start py-8 text-white"
    >
      <div className="bg-[#2b2c3b] w-full max-w-3xl px-6 py-8 rounded-xl shadow-lg">
        <form className="flex flex-col gap-6" onSubmit={handlePaymentProof}>
          <h3 className="text-[#ff5722] text-3xl font-bold text-center">
            Upload Payment Proof
          </h3>

          {/* Amount Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg text-stone-300">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#1f202b] border border-stone-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-lg text-stone-300">
              Payment Proof (Screenshot)
            </label>
            <input
              type="file"
              onChange={proofHandler}
              className="file:bg-[#ff5722] file:border-none file:rounded-md file:text-white file:px-4 file:py-2 bg-[#1f202b] text-white border border-stone-600 rounded-md focus:outline-none"
            />
          </div>

          {/* Comment Input */}
          <div className="flex flex-col gap-2">
            <label className="text-lg text-stone-300">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              className="bg-[#1f202b] border border-stone-600 text-white px-3 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#ff5722] hover:bg-[#e24e1c] transition-colors duration-300 py-3 rounded-md text-xl font-semibold text-white"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
