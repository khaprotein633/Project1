import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Image } from 'antd';
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

const UpdateBrand = ({ brandId, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [brandData, setBrandData] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (brandId) {
            fetchBrandData();
        }
    }, [brandId]);

    const fetchBrandData = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/brand/getbyid/${brandId}`);
            const brand = res.data.brand;

            setBrandData(brand);

            form.setFieldsValue({
                brand_name: brand.brand_name,
            });

            if (brand.brand_logo_url) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'brand_logo',
                        status: 'done',
                        url: brand.brand_logo_url,
                    },
                ]);
            }
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi lấy thông tin thương hiệu!');
        }
    };

    const handleLogoChange = ({ fileList }) => {
        if (fileList.length > 1) {
            fileList = [fileList[fileList.length - 1]];
        }
        setFileList(fileList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('brand_name', values.brand_name);

            // Thêm logo nếu có thay đổi
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('brand_logo', fileList[0].originFileObj);
            }

            await axios.put(`http://localhost:4000/api/brand/update/${brandId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            form.resetFields();
            setFileList([]);
            if (onSuccess) {
                onSuccess();
            }
            toast.success('Cập nhật thương hiệu thành công!');
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <Form
                form={form}
                name="update-brand"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên thương hiệu"
                    name="brand_name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Logo thương hiệu">
                    <Upload
                        name="brand_logo"
                        listType="picture-card"
                        fileList={fileList}
                        maxCount={1} // Chỉ cho phép một hình ảnh
                        onPreview={handlePreview}
                        onChange={handleLogoChange}
                        beforeUpload={() => false} // Không upload tự động
                        onRemove={() => setFileList([])} // Xóa hình ảnh
                    >
                        {fileList.length < 1 && (
                            <Button icon={<UploadOutlined />}>Tải logo lên</Button>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật thương hiệu
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
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default UpdateBrand;
