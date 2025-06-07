import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate container and heading from right to original position using expo ease
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article
          ref={containerRef}
          className="w-full min-h-screen bg-[#0e0f1a] text-gray-950 px-4 pt-24 lg:pl-[320px] overflow-x-hidden"
          style={{
            opacity: 0, // Start hidden for GSAP
            willChange: "opacity, transform", // Hint for GPU optimization
          }}
        >
          <section className="my-8">
            <h1
              ref={headingRef}
              className="text-[#d6482b] text-3xl sm:text-4xl md:text-6xl font-bold mb-6"
              style={{ opacity: 0 }} // Start hidden for GSAP
            >
              Auctions
            </h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {allAuctions.length > 0 ? (
                allAuctions.map((element) => (
                  <Card
                    key={element._id}
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    startingBid={element.startingBid}
                    id={element._id}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-lg col-span-full">
                  No auctions available at the moment.
                </p>
              )}
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;
