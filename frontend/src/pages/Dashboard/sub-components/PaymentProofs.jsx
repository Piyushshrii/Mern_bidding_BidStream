import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white mt-5 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">User ID</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">{element.userId}</td>
                  <td className="py-2 px-4 text-center">{element.status}</td>
                  <td className="py-2 px-4">
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all"
                        onClick={() => handleFetchPaymentDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all"
                        onClick={() => handlePaymentProofDelete(element._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-sky-600 text-xl">
                  No payment proofs are found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (singlePaymentProof) {
      setAmount(singlePaymentProof.amount || "");
      setStatus(singlePaymentProof.status || "");
    }
  }, [singlePaymentProof]);

  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 z-50 transition-opacity duration-300 ${
        openDrawer && singlePaymentProof.userId ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-full max-w-xl mx-auto bg-white rounded-t-2xl overflow-y-auto shadow-lg transition-all duration-300 transform ${
          openDrawer && singlePaymentProof.userId
            ? "translate-y-0"
            : "translate-y-full"
        } fixed bottom-0 left-0 right-0 max-h-[90vh]`}
      >
        <div className="px-5 py-8">
          <h3 className="text-[#D6482B] text-3xl font-semibold text-center mb-1">
            Update Payment Proof
          </h3>
          <p className="text-stone-600 text-center">
            You can update payment status and amount.
          </p>

          <form className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-stone-600">User ID</label>
              <input
                type="text"
                value={singlePaymentProof.userId || ""}
                disabled
                className="px-3 py-2 border rounded-md bg-gray-100 text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-stone-600">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-stone-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Settled">Settled</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-stone-600">Comment</label>
              <textarea
                rows={4}
                value={singlePaymentProof.comment || ""}
                disabled
                className="px-3 py-2 border rounded-md bg-gray-100 text-gray-700"
              />
            </div>

            <div>
              <Link
                to={singlePaymentProof.proof?.url || "#"}
                target="_blank"
                className="block text-center bg-[#D6482B] text-white font-semibold py-2 rounded-md hover:bg-[#b8381e] transition-all"
              >
                View Payment Proof
              </Link>
            </div>

            <button
              type="button"
              onClick={handlePaymentProofUpdate}
              className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              {loading ? "Updating Payment Proof..." : "Update Payment Proof"}
            </button>

            <button
              type="button"
              onClick={() => setOpenDrawer(false)}
              className="bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-700 transition-all"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
