import ProductList from '../components/ProductList'
import { useProducts } from '../hooks/useProducts';

const ProductPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div>
      <ProductList products={products}/>
    </div>
  )
}

export default ProductPage