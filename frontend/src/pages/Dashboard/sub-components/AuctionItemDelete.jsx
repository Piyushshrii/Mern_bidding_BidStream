import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-[#12131c] border border-gray-700 rounded-md">
          <thead className="bg-[#1f202b] text-[#fd6843]">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {allAuctions.length > 0 ? (
              allAuctions.map((element) => {
                return (
                  <tr
                    key={element._id}
                    className="border-b border-gray-700 hover:bg-[#2a2c37] transition-colors"
                  >
                    <td className="py-3 px-6">
                      <img
                        src={element.image?.url}
                        alt={element.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-6">{element.title}</td>
                    <td className="py-3 px-6 flex space-x-3">
                      <Link
                        to={`/auction/details/${element._id}`}
                        className="bg-[#fd6843] text-[#12131c] py-1 px-4 rounded-md font-semibold hover:bg-[#e05730] transition-colors duration-300"
                      >
                        View
                      </Link>
                      <button
                        className="bg-[#fd6843] text-[#12131c] py-1 px-4 rounded-md font-semibold hover:bg-[#e05730] transition-colors duration-300"
                        onClick={() => handleAuctionDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-left text-lg text-[#fd6843] py-4">
                <td colSpan={3}>No Auctions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AuctionItemDelete;
