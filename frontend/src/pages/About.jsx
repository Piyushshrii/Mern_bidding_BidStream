import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-[#0e0f1a] text-white py-20 px-6 lg:ml-[320px]">
      <div className="max-w-5xl space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-[#d6482b] text-4xl font-extrabold md:text-6xl xl:text-7xl">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Welcome to <span className="font-semibold text-white">BidStream</span>, the ultimate destination for online auctions and bidding excitement. Founded in 2024, we are dedicated to providing a dynamic and user-friendly platform for buyers and sellers to connect, explore, and transact in a secure and seamless environment.
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-[#d6482b]">Our Mission</h3>
          <p className="text-lg text-white/80">
            At BidStream, our mission is to revolutionize the way people buy and sell items online. We strive to create an engaging and trustworthy marketplace that empowers individuals and businesses to discover unique products, make informed decisions, and enjoy the thrill of competitive bidding.
          </p>
        </div>

        {/* Values */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#d6482b]">Our Values</h3>
          <ul className="space-y-4">
            {values.map((value) => (
              <li
                key={value.id}
                className="bg-white/5 hover:bg-[#d6482b] hover:text-black transition-colors duration-300 p-4 rounded-xl shadow-md"
              >
                <span className="block text-xl font-bold">{value.title}</span>
                <span className="text-white/80 hover:text-black">{value.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Story */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-[#d6482b]">Our Story</h3>
          <p className="text-lg text-white/80">
            Founded by <span className="font-semibold text-white">Piyush Shrivastava</span>, BidStream was born out of a passion for connecting people with unique and valuable items. With years of experience in the auction industry, our team is committed to creating a platform that offers an unparalleled auction experience for users worldwide.
          </p>
        </div>

        {/* Join */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-[#d6482b]">Join Us</h3>
          <p className="text-lg text-white/80">
            Whether you're looking to buy, sell, or simply explore, BidStream invites you to join our growing community of auction enthusiasts. Discover new opportunities, uncover hidden gems, and experience the thrill of winning your next great find.
          </p>
        </div>

        {/* Closing */}
        <div>
          <p className="text-[#d6482b] text-xl font-bold">
            Thank you for choosing BidStream. We look forward to being a part of your auction journey!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
