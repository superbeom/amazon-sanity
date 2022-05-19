import React from "react";
import Link from "next/link";
import Image from "next/image";

import { exchangeImageUrl } from "../lib/utils";

const HeroBanner = ({
  heroBanner: {
    smallText,
    midText,
    largeText1,
    image,
    product,
    buttonText,
    desc,
  },
}) => (
  <div className="hero-banner-container">
    <div>
      <p className="beats-so">{smallText}</p>
      <h3>{midText}</h3>
      <h1>{largeText1}</h1>

      <div className="hero-banner-image">
        <Image
          src={exchangeImageUrl(image.asset._ref)}
          alt="headphones"
          width="500vw"
          height="500vw"
        />
      </div>

      <div>
        <Link href={`/product/${product}`}>
          <button type="button">{buttonText}</button>
        </Link>
        <div className="desc">
          <h5>Descriptions</h5>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  </div>
);

export default HeroBanner;
