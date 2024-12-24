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
    const [brandData, setBrandData] = useState(null); // Changed initial state to null
    const [newLogo, setNewLogo] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (brandId) {  // Ensure brandId is valid before making request
            fetchBrandData();
            form.setFieldsValue({
              brand_name: brandData.brand.brand_name,
              brand_logo: brandData.brand.brand_logo_url ? [{
                  uid: '-1', name: 'brand_logo', status: 'done', url: brandData.brand.brand_logo_url
              }] : [],
          });
        }
    }, [brandId]);

    const fetchBrandData = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/brand/get/${brandId}`);
            setBrandData(res.data.brand);
            
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi lấy thông tin thương hiệu!');
        }
    };

    const handleLogoChange = (info) => {
        if (info.file.status === 'done') {
            setNewLogo(info.file.originFileObj);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleRemoveImage = (file) => {
        setFileList((prev) => prev.filter(f => f.uid !== file.uid));
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
            if (newLogo) {
                formData.append('brand_logo', newLogo);
            }

            const res = await axios.put(`http://localhost:4000/api/brand/update/${brandId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            form.resetFields();
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

                <Form.Item
                    label="Logo thương hiệu"
                    name="brand_logo"
                    valuePropName="fileList"
                    getValueFromEvent={e => e && e.fileList}
                >
                    <Upload
                        name="brand_logo"
                        listType="picture-card"
                        maxCount={1}
                        onPreview={handlePreview}
                        onChange={handleLogoChange}
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Tải logo lên</Button>
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
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default UpdateBrand;
