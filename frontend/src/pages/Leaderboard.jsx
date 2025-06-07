import Spinner from "@/custom-components/Spinner";
import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const tableRef = useRef(null);
  const rowsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container and heading
      gsap.fromTo(
        [containerRef.current, headingRef.current],
        { opacity: 0, x: 800 },
        {
          opacity: 1,
          x: 0,
          duration: 3.6,
          ease: "expo.out",
        }
      );

      // Animate table rows with stagger
      gsap.fromTo(
        rowsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.05,
          delay: 1.5,
          ease: "power2.out",
        }
      );

      // Animate table itself fading in
      gsap.fromTo(
        tableRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          delay: 1.2,
          ease: "sine.inOut",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen px-4 pt-24 lg:pl-[320px] bg-[#0e0f1a] text-white"
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-8" ref={headingRef}>
            <h1 className="text-[#d6482b] text-3xl sm:text-4xl md:text-6xl font-bold">
              Bidders Leaderboard
            </h1>
          </div>

          <div
            ref={tableRef}
            className="overflow-x-auto rounded-lg shadow"
          >
            <table className="min-w-full bg-[#151623] border border-[#2c2d3a] text-left">
              <thead className="bg-[#1f2130] text-gray-300 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4">Rank & Pic</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Bid Expenditure</th>
                  <th className="py-3 px-4">Auctions Won</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {leaderboard.slice(0, 100).map((element, index) => (
                  <tr
                    key={element._id}
                    ref={(el) => (rowsRef.current[index] = el)}
                    className="border-b border-[#2c2d3a] hover:bg-[#1f2130] transition-all"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <span className="text-[#d6482b] font-bold text-lg w-6 text-center">
                        {index + 1}
                      </span>
                      <img
                        src={element.profileImage?.url}
                        alt={element.username}
                        className="h-10 w-10 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-3 px-4">{element.userName}</td>
                    <td className="py-3 px-4 text-[#f5c26b]">
                      ${element.moneySpent}
                    </td>
                    <td className="py-3 px-4 text-[#9be7c4]">
                      {element.auctionsWon}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
