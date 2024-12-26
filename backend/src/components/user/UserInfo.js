import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = ({ userid }) => {
    const [user, setUser] = useState(null); // Khởi tạo user là null

    useEffect(() => {
        if (userid) {
            fetchUser(); // Gọi hàm fetchUser khi có userid
        }
    }, [userid]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/user/get/${userid}`);
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
            {user ? ( // Kiểm tra nếu user tồn tại mới hiển thị dữ liệu
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                        <strong>User ID:</strong> {user._id}
                    </div>
                    <div>
                        <strong>Tên:</strong> {user.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                        <strong>Password:</strong> {user.password}
                    </div>
                    <div>
                        <strong>Địa chỉ:</strong> {user.address || 'N/A'}
                    </div>
                    <div>
                        <strong>Số điện thoại:</strong> {user.phonenumber || 'N/A'}
                    </div>
                </div>
            ) : (
                <p>Loading user information...</p> // Hiển thị thông báo trong khi đang tải dữ liệu
            )}
        </div>
    );
};

export default UserInfo;
