import React from "react";
import Link from "next/link";
import Image from "next/image";

import { exchangeImageUrl } from "../lib/utils";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            className="product-image"
            src={exchangeImageUrl(image && image[0].asset._ref)}
            alt={name}
            width={250}
            height={250}
          />

          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
