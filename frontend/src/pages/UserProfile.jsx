import React, { useEffect, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "@/custom-components/Spinner";
import gsap from "gsap";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

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

  return (
    <section className="w-full min-h-screen bg-[#0F111A] text-white px-4 lg:px-8 py-20">
      {loading ? (
        <Spinner />
      ) : (
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto flex flex-col items-center gap-8"
        >
          <div className="flex flex-col items-center">
            <img
              src={user.profileImage?.url}
              alt="User"
              className="w-36 h-36 rounded-full object-cover border-4"
              style={{ borderColor: "#f5efe6" }}
            />
            <h2 className="text-2xl font-bold mt-4">{user.userName}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          {/* Personal Details */}
          <div className="bg-[#1A1D2E] w-full rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-[#d6482b] mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Username" value={user.userName} />
              <Info label="Email" value={user.email} />
              <Info label="Phone" value={user.phone} />
              <Info label="Address" value={user.address} />
              <Info label="Role" value={user.role} />
              <Info
                label="Joined On"
                value={user.createdAt?.substring(0, 10)}
              />
            </div>
          </div>

          {/* Payment Details */}
          {user.role === "Auctioneer" && (
            <div className="bg-[#1A1D2E] w-full rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[#d6482b] mb-4">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info
                  label="Bank Name"
                  value={user.paymentMethods.bankTransfer.bankName}
                />
                <Info
                  label="Bank Account (IBAN)"
                  value={
                    user.paymentMethods.bankTransfer.bankAccountNumber
                  }
                />
                <Info
                  label="User Name On Bank Account"
                  value={
                    user.paymentMethods.bankTransfer.bankAccountName
                  }
                />
                <Info
                  label="Easypaisa Account Number"
                  value={
                    user.paymentMethods.easypaisa.easypaisaAccountNumber
                  }
                />
                <Info
                  label="Paypal Email"
                  value={user.paymentMethods.paypal.paypalEmail}
                />
              </div>
            </div>
          )}

          {/* Other Details */}
          <div className="bg-[#1A1D2E] w-full rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-[#d6482b] mb-4">
              Other User Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.role === "Auctioneer" && (
                <Info
                  label="Unpaid Commissions"
                  value={user.unpaidCommission}
                />
              )}
              {user.role === "Bidder" && (
                <>
                  <Info label="Auctions Won" value={user.auctionsWon} />
                  <Info label="Money Spent" value={user.moneySpent} />
                </>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <button
            className="mt-6 bg-[#d6482b] hover:bg-[#bb3a21] text-white font-semibold px-6 py-2 rounded-full transition duration-300 shadow-md"
            disabled
          >
            Edit Profile (Coming Soon)
          </button>
        </div>
      )}
    </section>
  );
};

const Info = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      className="w-full p-2 bg-[#0F111A] border border-gray-600 text-white rounded-md focus:outline-none"
      disabled
    />
  </div>
);

export default UserProfile;
