import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "../../lib/client";

import { Product } from "../../components";

const ProductDetails = ({ products, product }) => {
  const { qty, incQty, decQty, onAdd } = useStateContext();
  const [index, setIndex] = useState(0);

  const { image, name, price, details } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
              alt={name}
            />
          </div>

          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                key={item._key}
                src={urlFor(item)}
                alt={name}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>

          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>

            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>

              <span className="num">{qty}</span>

              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              className="add-to-cart"
              type="button"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>

            <button className="buy-now" type="button" onClick={() => null}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>

        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const productsQuery = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

  const products = await client.fetch(productsQuery);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productsQuery = '*[_type == "product"]';
  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;

  const products = await client.fetch(productsQuery);
  const product = await client.fetch(productQuery);

  return {
    props: {
      products,
      product,
    },
  };
};
