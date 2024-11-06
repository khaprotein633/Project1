import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image } from 'antd';

const ProductInfo = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("Current product ID:", product);
        if (productId) {
            fetchProduct();
            console.log("Current product ID:", product);
        }
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/product/get/${productId}`);
            setProduct(res.data.product);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
            {product ? ( // Kiểm tra nếu product tồn tại mới hiển thị dữ liệu
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                        <strong>ID:</strong> {product._id}
                    </div>
                    <div>
                        <strong>Name:</strong> {product.product_name}
                    </div>
                    <div>
                        <strong>Brand ID:</strong> {product.brand_id}
                    </div>
                    <div>
                        <strong>Description:</strong> {product.description}
                    </div>
                    <div>
                        <strong>Detail:</strong> {product.detail}
                    </div>
                    <div>
                        <strong>Main Image:</strong> <Image 
                                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                    src={product.main_image}
                                />
                    </div>
                    <div>
                        <strong>Images:</strong>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {product.images.map((img, index) => (

                                <Image
                                key={index}
                                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                    src={img}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <strong>Hide:</strong> {product.hide ? 'Yes' : 'No'}
                    </div>
                    <div>
                        <strong>Date Added:</strong> {new Date(product.date_added).toLocaleDateString()}
                    </div>
                    <div>
                        <strong>Date Updated:</strong> {new Date(product.date_updated).toLocaleDateString()}
                    </div>
                </div>
            ) : (
                <p>Loading product information...</p>
            )}
        </div>
    );
};

export default ProductInfo;
