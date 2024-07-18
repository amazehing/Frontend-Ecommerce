import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import Breadcrum from "../Components/Breadcrum/Breadcrum";

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:8443/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProduct();

        // No cleanup needed

    }, [productId]); // Ensure useEffect runs when productId changes

    // Render loading state while product is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Only render ProductDisplay if product data is available */}
            <Breadcrum item={product}/>
            {product && <ProductDisplay item={product} />}
            <DescriptionBox />
            <RelatedProducts />
        </div>
    );
};

export default Product;
