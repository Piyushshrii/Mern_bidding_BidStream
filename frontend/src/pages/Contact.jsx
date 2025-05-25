import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_v01mtcu",
        "template_3a1r5xp",
        templateParams,
        "YcOimjllS64zn4ghK"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch(() => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="w-full min-h-screen pt-24 px-4 lg:pl-[320px] bg-[#0d0d14] text-white flex justify-center">
      <div className="w-full max-w-3xl bg-[#1b1d2a] rounded-xl shadow-lg p-8 md:p-12">
        <h3 className="text-3xl font-bold text-[#f26440] mb-8 text-center">
          Contact Us
        </h3>
        <form onSubmit={handleContactForm} className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[#e5e5e5]">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-md bg-[#2b2c37] text-white border border-[#3c3f51] focus:ring-2 focus:ring-[#f26440] outline-none"
              required
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[#e5e5e5]">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md bg-[#2b2c37] text-white border border-[#3c3f51] focus:ring-2 focus:ring-[#f26440] outline-none"
              required
            />
          </div>
          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-[#e5e5e5]">Your Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-md bg-[#2b2c37] text-white border border-[#3c3f51] focus:ring-2 focus:ring-[#f26440] outline-none"
              required
            />
          </div>
          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label className="text-[#e5e5e5]">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-3 rounded-md bg-[#2b2c37] text-white border border-[#3c3f51] focus:ring-2 focus:ring-[#f26440] outline-none"
              required
            />
          </div>
          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-[#e5e5e5]">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 rounded-md bg-[#2b2c37] text-white border border-[#3c3f51] focus:ring-2 focus:ring-[#f26440] outline-none"
              required
            />
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="bg-[#f26440] hover:bg-[#d6482b] transition-colors duration-300 py-3 px-6 text-white rounded-lg font-semibold text-lg self-center"
          >
            {loading ? "Sending Message..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
