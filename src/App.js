import './App.css';
import React, { useState, useEffect } from 'react';
import { getCategories } from './fetcher';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from './components/ProductDetails.js';
import Checkout from './components/Checkout.js';
import Basket from './components/Basket.js';
import Category from './components/Category.js';
import Layout from './components/Layout.js';
import Home from './components/Home.js';
import OrderConfirmation from './components/OrderConfirmation.js';
import SearchResults from './components/SearchResults.js';


function App() {
  const [categories, setCategories] = useState({ errorMessage: '', data: [] });

  //synchronous call
  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  }, [])


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout categories={categories} />}>
            <Route index element={<Home />} ></Route>
            <Route path="basket" element={<Basket />}></Route>
            <Route path="checkout" element={<Checkout />}></Route>
            <Route path="/orderConfirmation" element={<OrderConfirmation />}></Route>
            <Route path="search" element={<SearchResults />}></Route>
            <Route path="products/:productid" element={<ProductDetails />}></Route>
            <Route path="categories/:categoryId/products/:productid" element={<ProductDetails />}></Route>
            <Route path="categories/:categoryId" element={<Category />}></Route>
          </Route>
          {/* This route element has nested routes which we can render using outlet */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;