import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-screen px-4 pt-24 lg:pl-[320px] bg-[#0e0f1a] text-white">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-[#d6482b] text-3xl sm:text-4xl md:text-6xl font-bold">
              Bidders Leaderboard
            </h1>
          </div>

          <div className="overflow-x-auto rounded-lg shadow">
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
