import ProductList from '@/components/product/ProductList.tsx'
import { useProducts } from '../hooks/useProducts';

const ProductPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:py-20">
        <div className="container-xl lg:container m-auto">
          <div className="mb-12">
            <div className="h-12 bg-gray-300 rounded w-1/3 mb-3 animate-pulse"></div>
            <div className="h-1.5 bg-gray-300 rounded-full w-20 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded mb-4 w-5/6 animate-pulse"></div>
                  <div className="border-t border-gray-200 my-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4 w-2/3 animate-pulse"></div>
                  <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-slate-50 to-white px-4 py-20">
        <div className="container-xl lg:container m-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <svg
              className="w-24 h-24 text-red-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Products</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <ProductList products={products}/>
    </div>
  )
}

export default ProductPage