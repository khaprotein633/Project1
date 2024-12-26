import React, { useEffect, useState } from 'react';
import { Form, Select, Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/category/getall');
            setCategories(res.data.list);
        } catch (err) {
            console.log(err);
            toast.error('Lỗi khi lấy danh sách loại sản phẩm!');
        }
    };

    const fetchBrands = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/brand/getall');
            setBrands(res.data.listBrand);
        } catch (err) {
            console.log(err);
            toast.error('Lỗi khi lấy danh sách thương hiệu!');
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            // Tạo FormData để gửi ảnh và dữ liệu sản phẩm
            const formData = new FormData();
            formData.append('product_name', values.product_name);
            formData.append('description', values.description);
            formData.append('detail', values.detail);
            formData.append('category_id', values.category_id);
            formData.append('brand_id', values.brand_id);

            // Thêm ảnh chính nếu có
            if (values.main_image && values.main_image[0]) {
                formData.append('main_image', values.main_image[0].originFileObj);
            }

            // Thêm ảnh phụ nếu có
            if (values.auxiliary_images && values.auxiliary_images.length > 0) {
                values.auxiliary_images.forEach((file) => {
                    formData.append('product_images', file.originFileObj);
                });
            }

            // Gửi request API tạo sản phẩm
            await axios.post('http://localhost:4000/api/product/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            form.resetFields();
            if (onSuccess) {
                onSuccess();
            }
            toast.success('Thêm sản phẩm thành công!');
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
                name="create-product"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="product_name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mô tả sản phẩm"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Chi tiết sản phẩm"
                    name="detail"
                    rules={[{ required: true, message: 'Vui lòng nhập chi tiết sản phẩm!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Loại sản phẩm"
                    name="category_id"
                    rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
                >
                    <Select placeholder="Chọn loại sản phẩm">
                        {categories.map(item => (
                            <Select.Option key={item._id} value={item._id}>
                                {item.category_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Thương hiệu"
                    name="brand_id"
                    rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
                >
                    <Select placeholder="Chọn thương hiệu">
                        {brands.map(item => (
                            <Select.Option key={item._id} value={item._id}>
                                {item.brand_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ảnh chính"
                    name="main_image"
                    valuePropName="fileList"
                    getValueFromEvent={e => e && e.fileList}
                    rules={[{ required: true, message: 'Vui lòng tải lên ảnh chính!' }]}
                >
                    <Upload name="main_image" listType="picture" maxCount={1} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Ảnh phụ"
                    name="auxiliary_images"
                    valuePropName="fileList"
                    getValueFromEvent={e => e && e.fileList}
                >
                    <Upload name="auxiliary_images" listType="picture" multiple beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateProduct;
