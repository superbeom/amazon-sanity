import React from "react";
import Head from "next/head";

import { client } from "../lib/client";

import { HeroBanner, Product, FooterBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <Head>
        <title>Amazona</title>
      </Head>

      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
