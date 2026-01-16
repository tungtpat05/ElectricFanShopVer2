import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Product } from "../types/product";

interface ProductItemProps {
  product: Product;
}   

const ProductItem = ({ product }: ProductItemProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  let description = product.description;
  if (!showFullDescription) {
    description = description.substring(0, 90) + "...";
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <img src={product.image} alt={product.productName} className="w-auto h-full object-cover rounded-lg mb-4" />
          <div className="text-gray-600 my-2">{product.productName}</div>
        </div>

        <div className="mb-5">{description}</div>
        {/* <div className="mb-5">{product.description}</div> */}

        <button onClick={() => setShowFullDescription(!showFullDescription)} className="text-indigo-500 mb-5 hover:text-indigo-600">
          {showFullDescription ? "Less" : "More"}
        </button>

        <h3 className="text-indigo-500 mb-2">{product.price}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <Link
            to={`/products/${product.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
