import ProductCard from "./ProductItem.tsx";
import { Product } from "@/types/product.ts";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:py-20">
      <div className="container-xl lg:container m-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            All Motorbikes
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-base md:text-lg">
            Discover our premium collection of high-quality motorbikes
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="text-center">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m0 0l-8-4m8 4v10l8-4v-10M4 7v10l8 4"
                />
              </svg>
              <p className="text-lg text-gray-600 font-medium">
                No products available
              </p>
              <p className="text-gray-500 mt-2">
                Please check back later
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
