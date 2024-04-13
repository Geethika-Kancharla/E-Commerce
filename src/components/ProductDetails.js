import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getProductsById } from '../fetcher';
import '../App.css'
import styled from 'styled-components'
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const params = useParams();
  const { addProduct } = useContext(CartContext);
  //instead we can use const {productid}=useParams();
  // const [product, setProduct] = useState({ errorMessage: '', data: [] })
  const [product, setProduct] = useState({ errorMessage: '', data: {} })

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsById(params.productid)//(productid)
      setProduct(responseObject);
    }
    fetchData();
  }, [params.productid])
 
  
  return (
    <>
      {/* <div>ProductDetails id:{params.productid} title:{product.data.title}</div> */}
      {/* //params are used to read information from url
    //Here we reqiure info of product id from the url and here id:{productid} */}
      <article>
        <div className='category-product-title'>
          {product.data.title}
        </div>
        <figure>
          <div className='category-product-image-container'>
            <img src={`/assets/${product.data.image}`} alt={product.data.title} />
          </div>
        </figure>

        <aside>
          <div className='category-product-info-dimensions'>
            <h3>dimensions</h3>
            <label>{product.data.specs?.dimensions}</label>
          </div>
          {product.data.specs?.capacity &&
            <div className='category-product-info-capacity'>
              <h3>Capacity</h3>
              <label>{product.data.specs?.capacity}</label>
            </div>
          }
          <div className='category-product-info-features'>
            <h3>Features</h3>
            <ul>
              {product.data.features?.map((f, i) => {
                return <li key={`feature${i}`}>{f}</li>//Here i is an index to array features
              })}
            </ul>
          </div>
        </aside>
        <aside className='category-product-finance'>
          <div className='category-product-finance-price'>
            &pound;{product.data.price}
          </div>
          <div className='category-product-info-stock'>
            <label>Stock Level:{product.data.stock}</label>
            <label>FREE Delivery</label>
          </div>
          <div className='category-product-action'>
            <button onClick={() =>
              addProduct({
                id: product.data.id,
                title: product.data.title,
                price: product.data.price,
              })
            }>
              Add to Basket</button>
          </div>
        </aside>
        <ProductInfoDescription>{product.data?.description}</ProductInfoDescription>
      </article>
    </>
  )
}

export default ProductDetails

const ProductInfoArticle = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.25fr 1fr 0.25fr;
    column-gap: 20px;
`;

const ProductInfoDescription = styled.div`
    grid-column: 1 / span 3;
`;

const ProductTitle = styled.div`
    grid-column: 1 / span 3;
    color: darkslategray;
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
`;

const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60%;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoHeader = styled.h3`
    color: darkslategray;
    font-size: 1em;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
`;

const ProductInfoListItem = styled.li`
    padding-top: 5px;
`;

const ProductInfoStock = styled.div`
    padding-left: 10px;
    margin-top: 20px;
    padding-top: 10px;
    background-color: lightgrey;
    height: 20%;
    width: 30%;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`;

const ProductInfoStockLabel = styled.label`
    padding-bottom: 5px;
`;

const ProductInfoAction = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoActionButton = styled.button`
    width: 160px;
    height: 30px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: lightgray;
    border: solid 1px slategrey;
    font-weight: bold;
`;

const ProductInfoFinancePrice = styled.div`
    color: darkslategray;
    font-size: 2em;
    font-weight: bold;
    padding-top: 10px;
`;
