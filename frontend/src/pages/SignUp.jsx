import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="w-full min-h-screen px-4 lg:px-8 py-20 bg-[#0F111A] text-white">
      <div className="max-w-4xl mx-auto bg-[#1A1D2E] rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-center text-[#d6482b] font-bold text-3xl md:text-5xl mb-6">
          Register
        </h1>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white appearance-none"
                >
                  <option className="bg-[#12131c] text-white" value="">
                    Select Role
                  </option>
                  <option className="bg-[#12131c] text-white" value="Auctioneer">
                    Auctioneer
                  </option>
                  <option className="bg-[#12131c] text-white" value="Bidder">
                    Bidder
                  </option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Profile Image</label>
            <div className="flex items-center gap-4 mt-1">
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="Profile Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
              <input
                type="file"
                onChange={imageHandler}
                className="text-white"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Payment Method Details
            </h2>
            <p className="text-sm text-gray-400 mb-3">
              Only required for Auctioneers
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                  disabled={role === "Bidder"}
                >
                  <option className="bg-[#12131c] text-white" value="">Select Your Bank</option>
                  <option className="bg-[#12131c] text-white" value="Meezan Bank">State Bank Of India</option>
                  <option className="bg-[#12131c] text-white" value="UBL">HDFC Bank</option>
                  <option className="bg-[#12131c] text-white" value="HBL">Kotak Mahindra Bank</option>
                  <option className="bg-[#12131c] text-white" value="Allied Bank">Canara Bank</option>
                </select>
                <input
                  type="text"
                  value={bankAccountNumber}
                  placeholder="IBAN / IFSC"
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                  disabled={role === "Bidder"}
                />
                <input
                  type="text"
                  value={bankAccountName}
                  placeholder="Bank Account Username"
                  onChange={(e) => setBankAccountName(e.target.value)}
                  className="border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                  disabled={role === "Bidder"}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  value={easypaisaAccountNumber}
                  placeholder="Easypaisa Account Number"
                  onChange={(e) => setEasypaisaAccountNumber(e.target.value)}
                  className="border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                  disabled={role === "Bidder"}
                />
                <input
                  type="email"
                  value={paypalEmail}
                  placeholder="Paypal Email"
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="border-b border-gray-600 bg-transparent py-2 focus:outline-none text-white"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#d6482b] hover:bg-[#b8381e] text-white text-lg font-semibold px-8 py-2 rounded-2xl shadow-md transition-all duration-300"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
