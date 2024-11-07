import React, { useEffect, useState } from 'react';
import { Form, Select, Button, Input, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateInventory = ({ product_id, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [sizes, setSizes] = useState([]); 

    // Lấy danh sách kích thước từ mảng đã tạo
    useEffect(() => {
        fetchSizes();
    }, []);

    const fetchSizes = () => {
        const sizeList = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
        setSizes(sizeList); 
    };

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            
            const formData = new FormData();
            formData.append('product_id', product_id); 
            formData.append('size', values.size); 
            formData.append('color', values.color); 
            formData.append('quantity', values.quantity); 
            formData.append('price', values.price); 

            // Thêm ảnh nếu có
            if (values.image_url && values.image_url[0]) {
                formData.append('image_url', values.image_url[0].originFileObj);
            }

            // Gửi request API tạo kho
            await axios.post('http://localhost:4000/api/inventory/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            form.resetFields();
            if (onSuccess) {
                onSuccess(); // Callback sau khi thêm thành công
            }
            toast.success('Thêm kho thành công!');
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || 'Có lỗi xảy ra!');
            } else {
                toast.error('Có lỗi xảy ra!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <Form
                form={form}
                name="create-inventory"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Màu sắc"
                    name="color"
                    rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Hình ảnh"
                    name="image_url"
                    valuePropName="fileList"
                    getValueFromEvent={e => e && e.fileList}
                    rules={[{ required: true, message: 'Vui lòng tải hình ảnh!' }]}
                >
                    <Upload name="image_url" listType="picture" maxCount={1} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Kích thước"
                    name="size"
                    rules={[{ required: true, message: 'Vui lòng chọn kích thước!' }]}
                >
                    <Select placeholder="Chọn kích thước">
                        {sizes.map((size, index) => (
                            <Select.Option key={index} value={size}>
                                {size}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                        { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                        { type: 'number', min: 0, message: 'Giá không thể nhỏ hơn 0!' }
                    ]}
                >
                   <InputNumber min={0}  />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số lượng!' },
                        { type: 'number', min: 0, message: 'Số lượng không thể nhỏ hơn 0!' }
                    ]}
                >
                    <InputNumber min={0} max={9999} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo kho hàng
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateInventory;
