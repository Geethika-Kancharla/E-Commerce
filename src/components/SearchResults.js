import React, {useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { getProductsByQuery } from "../fetcher";
import '../App.css';
import Category_Product from './category_product'

const SearchResults = () => {
    const [products, setProducts] = useState({
        errorMessage: '',
        data: []
    })

    const [searchParams] = useSearchParams();
    const query = searchParams.get("s");

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductsByQuery(query);
            setProducts(responseObject);
        };
        fetchData();
    }, [query]);

    const renderProducts = () => {
        if (products.data.length > 0) {
            return products.data.map((p) => (
                <Category_Product key={p.id} {...p}>
                    {p.title}
                </Category_Product>
            ));
        }
        else {
            return <div>No results found</div>
        }
    };

    return (
        <div>
            {products.errorMessage && <div>Error:{products.errorMessage}</div>}
            {
                renderProducts()
            }
        </div>
    )
};

export default SearchResults;;
