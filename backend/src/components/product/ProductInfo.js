import React from 'react'





const ProductInfo = ({productid}) => {
    const [product, setProduct] = useState(null);
    const [productimg, setProductimg] = useState([]);
    useEffect(() => {
        console.log("Current product ID:", productid);
        if (productid) {
            fetchProduct(); // Gọi hàm fetchUser khi có userid
            fetchProductIMG();
        }
    }, [userid]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/product/get/${productid}`); 
            setProduct(res.data.product);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchProductIMG = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/image/get/${productid}`); 
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className="container mt-4">
            { product? ( // Kiểm tra nếu user tồn tại mới hiển thị dữ liệu
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                        <strong>ID:</strong> {product._id}
                    </div>
                    <div>
                        <strong>Name:</strong> {product.product_name}
                    </div>
                    <div>
                        <strong>Email:</strong> {product.img}
                    </div>
                    <div>
                        <strong>Password:</strong> {product.password}
                    </div>
                    <div>
                        <strong>Địa chỉ:</strong> {product.address || 'N/A'}
                    </div>
                    <div>
                        <strong>Số điện thoại:</strong> {user.phonenumber || 'N/A'}
                    </div>
                </div>
            ) : (
                <p>Loading user information...</p> // Hiển thị thông báo trong khi đang tải dữ liệu
            )}
        </div>
  )
}

export default ProductInfo
