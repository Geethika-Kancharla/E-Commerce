import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../fetcher';
import Category_Product from './category_product'

const Category = ({ id, title, onCategoryClick }) => {
  const [products, setProducts] = useState({
    errorMessage: '',
    data: []
  })

  const renderProducts = () => {
    return products.data.map(p =>
      <Category_Product  key={p.id} {...p}>{p.title}</Category_Product>
    );
  }

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProducts(categoryId)
      setProducts(responseObject);
    }
    fetchData();
  }, [categoryId]);


  return (
    <div>
      <h1>Products</h1>
      {products.errorMessage && <div>Error:{products.errorMessage}</div>}
      {
        products.data && renderProducts()
      }
    </div>
  )
}

export default Category