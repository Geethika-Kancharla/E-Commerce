import React, { useContext } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { CartContext } from '../context/CartContext';
/* Styled components in react is to enhance CSS for styling react components
keeps track of which components are rendered on the page and injects their styles and nothing else.fully automatically */
//Using styled components

const Category_Product = ({ id, title, image, specs, features, price, stock, }) => {
    const navigate = useNavigate();
    const { addProduct } = useContext(CartContext);

    return (
        <article>
            <ProductTitle>
                <Link to={`products/${id}`} >{title}</Link>
                {/* Navigation in react is possible by Link command and useNavigate  */}
            </ProductTitle>
            <figure>
                <ProductImageContainer>
                    <ProductImageContainerImage src={`/assets/${image}`} alt={title} />
                </ProductImageContainer>
            </figure>

            <aside>
                <div className='category-product-info-dimensions'>
                    <h3>dimensions</h3>
                    <label>{specs.dimensions}</label>
                </div>
                {specs.capacity &&
                    <div className='category-product-info-capacity'>
                        <h3>Capacity</h3>
                        <label>{specs.capacity}</label>
                    </div>
                }
                <div className='category-product-info-features'>
                    <h3>Features</h3>
                    <ul>
                        {features?.map((f, i) => {
                            return <li key={`feature${i}`}>{f}</li>//Here i is an index to array features
                        })}
                    </ul>
                </div>
            </aside>
            <aside className='category-product-finance'>
                <div className='category-product-finance-price'>
                    &pound;{price}
                </div>
                <div className='category-product-info-stock'>
                    <label>Stock Level:{stock}</label>
                    <label>FREE Delivery</label>
                </div>
                <div className='category-product-action'>
                    <button onClick={() => navigate(`/products/${id}`)}>View Product</button>
                    <button onClick={() =>  addProduct({id, title, price}) }>Add to Basket</button>
                </div>
            </aside>
        </article>
    )
}
export default Category_Product

const ProductTitle = styled.div`
grid-column: 1 / span 3;
color: darkslategrey;
font-weight: bold;
font-size: 1.5em;
padding-left: 10px;
`;

const ProductImageContainer = styled.div`
padding: 10px;
width: 60%;
`;
const ProductImageContainerImage = styled.img`
height:100%;
width:100%;
`;