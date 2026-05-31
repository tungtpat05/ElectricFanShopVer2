import { useState } from "react";
import { Link } from 'react-router-dom';
import { Product } from "@/types/product.ts";

interface ProductItemProps {
  product: Product;
}   

const ProductItem = ({ product }: ProductItemProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  let description = product.summary || product.description || "No description available";
  if (!showFullDescription && description.length > 85) {
    description = description.substring(0, 85) + "...";
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.basePrice;
  const displayPrice = hasDiscount ? product.discountPrice : product.basePrice;

  return (
    <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
        )}
        <img
          src={product.thumbnail}
          alt={product.productName}
          className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 p-4 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
        />
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Sale
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand Name */}
        <p className="text-xs text-indigo-600 font-semibold mb-1">
          {product.brand.brandName || 'Unknown Brand'}
        </p>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.productName}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Toggle Description Button */}
        {(product.summary?.length ?? product.description?.length ?? 0) > 85 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium mb-4 transition-colors"
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Price & Stock */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-2xl font-bold text-indigo-600">
              {formatPrice(displayPrice)}
            </p>
            {hasDiscount && (
              <p className="text-sm line-through text-gray-400">
                {formatPrice(product.basePrice)}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {product.isActive ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.isFeatured && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/products/${product.id}`}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg text-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
