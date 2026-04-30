import React from "react";
import Banner from "./Banner";
import Infosection from "./infosection";
import Brand from "./Brand";
import Reviews from "./Reviews";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const home = () => {
  return (
    <div className="mt-6">
      <Banner />
      <section className="mt-5">
        <Infosection />
      </section>
      <section>
        <Brand />
      </section>
      <section>
        <Reviews reviewPromise={reviewPromise} />
      </section>
    </div>
  );
};

export default home;
