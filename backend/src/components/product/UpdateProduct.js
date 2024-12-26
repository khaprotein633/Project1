import React, { useEffect, useState } from 'react';
import { Form, Select, Button, Input, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UpdateProduct = ({ editproduct, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [removeImages, setRemoveImages] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        if (editproduct) {
            form.setFieldsValue({
                product_name: editproduct.product_name,
                category_id: editproduct.category_id,
                brand_id: editproduct.brand_id,
                detail: editproduct.detail,
                description: editproduct.description,
                main_image: editproduct.main_image ? [{
                    uid: '-1', name: 'main_image', status: 'done', url: editproduct.main_image
                }] : [],
                auxiliary_images: editproduct.images ? editproduct.images.map((img, index) => ({
                    uid: index.toString(), name: `auxiliary_image_${index}`, status: 'done', url: img
                })) : []
            });
        }
    }, [editproduct]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/category/getall');
            setCategories(res.data.list);
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi lấy danh sách loại sản phẩm!');
        }
    };
 
    const fetchBrands = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/brand/getall');
            setBrands(res.data.listBrand);
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi lấy danh sách thương hiệu!');
        }
    };

    const handleRemoveImage = async (file) => {
        const imageUrl = file.url || file.preview;
    
        setRemoveImages((prev) => {
            const updatedList = [...prev, imageUrl];
            console.log("Updated removeImages list:", updatedList);  
            return updatedList;
        });
    };
    
    useEffect(() => {
        console.log("Current removeImages:", removeImages);
    }, [removeImages]);

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            
            const formData = new FormData();
            formData.append('product_name', values.product_name);
            formData.append('description', values.description);
            formData.append('detail', values.detail);
            formData.append('category_id', values.category_id);
            formData.append('brand_id', values.brand_id);
            formData.append('removeImages', JSON.stringify(removeImages)); 
            console.log( "aaaa:",formData.removeImages);
            if (values.main_image && values.main_image[0]?.originFileObj) {
                formData.append('main_image', values.main_image[0].originFileObj);
            }
            if (values.auxiliary_images && values.auxiliary_images.length > 0) {
                values.auxiliary_images.forEach((file) => {
                    formData.append('product_images', file.originFileObj);
                });
            }
            const res = await axios.put(`http://localhost:4000/api/product/update/${editproduct._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            form.resetFields();
            if (onSuccess) {
                onSuccess();
            }

            toast.success('Cập nhật sản phẩm thành công!');
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    return (
        <div className="container mt-4">
            <Form
                form={form}
                name="update-product"
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
                    <Upload name="main_image" listType="picture-card" maxCount={1} onPreview={handlePreview} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Ảnh phụ"
                    name="auxiliary_images"
                    valuePropName="fileList"
                    getValueFromEvent={e => e && e.fileList}
                >
                    <Upload name="auxiliary_images" listType="picture-card" maxCount={10} onPreview={handlePreview} onRemove={handleRemoveImage} multiple beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật sản phẩm
                    </Button>
                </Form.Item>
            </Form>

            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default UpdateProduct;
