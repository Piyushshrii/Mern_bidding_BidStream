import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);

  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    sectionRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
        }
      );
    });
  }, [loading]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="w-full min-h-screen bg-[#0F111A] text-white px-4 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <h1 className="text-[#d6482b] text-3xl md:text-5xl font-bold text-center">
              Super Admin Dashboard
            </h1>

            <div className="grid gap-12">
              {/* Monthly Revenue */}
              <div
                ref={addToRefs}
                className="bg-[#1A1D2E] rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Monthly Total Payments Received
                </h3>
                <div className="bg-[#0F111A] rounded-xl p-4 overflow-x-auto">
                  <PaymentGraph />
                </div>
              </div>

              {/* Users Graph */}
              <div
                ref={addToRefs}
                className="bg-[#1A1D2E] rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Users
                </h3>
                <div className="bg-[#0F111A] rounded-xl p-4 overflow-x-auto">
                  <BiddersAuctioneersGraph />
                </div>
              </div>

              {/* Payment Proofs */}
              <div
                ref={addToRefs}
                className="bg-[#1A1D2E] rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Payment Proofs
                </h3>
                <div className="bg-[#0F111A] rounded-xl p-4 overflow-x-auto">
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-2xl">
                      <PaymentProofs />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Items */}
              <div
                ref={addToRefs}
                className="bg-[#1A1D2E] rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Delete Items From Auction
                </h3>
                <div className="bg-[#0F111A] rounded-xl p-4 overflow-x-auto">
                  <AuctionItemDelete />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
