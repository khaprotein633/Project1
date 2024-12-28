import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
    const [options, setOptions] = useState([]);
    const [products, setProducts] = useState([]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Hàm lấy sản phẩm theo tên
    const fetchProductsByName = async (query) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/product/name/get/${query}`);
            setProducts(response.data.products); // Cập nhật sản phẩm
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Hàm xử lý khi người dùng tìm kiếm
    const handleSearch = async (value) => {
        if (value) {
            await fetchProductsByName(value); // Đợi fetch dữ liệu trước khi làm gì tiếp
            const newOptions = products.map((item) => {
                const firstInventory = item.inventory && item.inventory[0]; // Lấy biến thể đầu tiên trong inventory
                return {
                    value: item.product_name,
                    label: (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to={`/product/${item._id}`} onClick={scrollToTop}>
                                <div className="cart-item" key={item._id}>
                                    <img
                                        src={item.main_image}
                                        alt={item.product_name}
                                        className="item-image"
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                    <div className="item-details">
                                        <h3>{item.product_name}</h3>
                                        {firstInventory && (
                                            <p>
                                                Price: {parseInt(firstInventory.price).toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ),
                };
            });
            setOptions(newOptions); // Cập nhật các gợi ý
        } else {
            setOptions([]); // Nếu không có gì nhập, xóa các gợi ý
        }
    };

    // Hàm xử lý khi người dùng chọn một sản phẩm từ danh sách
    const onSelect = (value) => {
        console.log('Selected product:', value);
    };

    return (
        <AutoComplete
            popupMatchSelectWidth={400}
            style={{
                width: 300,
            }}
            options={options}
            onSelect={onSelect} // Xử lý khi chọn sản phẩm
            onSearch={handleSearch} // Tìm kiếm ngay lập tức khi nhập từ khóa
            size="large"
        >
            <Input.Search size="large" placeholder="Search for products..." enterButton />
        </AutoComplete>
    );
};

export default Search;
