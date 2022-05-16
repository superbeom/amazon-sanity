import React from "react";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-so">Small Text</p>
        <h3>Mid Text</h3>
        <img className="hero-banner-image" src="" alt="headphones" />

        <div>
          <Link href="/product/ID">
            <button type="button">Button Text</button>
          </Link>
          <div className="desc">
            <h5>Descriptions</h5>
            <p>DESCRIPTIONS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
