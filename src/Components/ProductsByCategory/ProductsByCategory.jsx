import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import "./ProductsByCategory.css";
import {useParams} from "react-router-dom";
import placeholderImg from "../../Components/Assets/placeholder.jpg";

const ProductsByCategory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const {categoryId} = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/categories/${categoryId}/products`);
                setProducts(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [categoryId]);


    return (
        <div className='relatedproducts'>
            <h1>Products</h1>
            <hr />
            {loading ? ( // Render loading indicator if products are being fetched
                <p>Loading...</p>
            ) : (
                <div className="relatedproducts-item">
                    {products.map((product) => (
                        <Item
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            image={product.images.length ? `http://localhost:8080/images/${product.images[0].id}` : placeholderImg}
                            new_price={product.new_price}
                            old_price={product.old_price}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsByCategory;
