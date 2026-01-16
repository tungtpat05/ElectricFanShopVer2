import React from 'react'
import ProductList from '../components/ProductList'
import { useProducts } from '../hooks/useProduct';

const HomePage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div>
      <ProductList products={products}/>
    </div>
  )
}

export default HomePage