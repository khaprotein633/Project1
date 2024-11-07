import React, { useEffect, useState } from 'react';
import { Form, Select, Button, Input, Upload, InputNumber, Image } from 'antd';
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

const EditInventory = ({ inventoryId, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [inventoryData, setInventoryData] = useState(null);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    useEffect(() => {
        fetchSizes();
        fetchInventory();
        console.log("id:", inventoryId);
    }, [inventoryId]);

    const fetchSizes = () => {
        const sizeList = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
        setSizes(sizeList);
    };

    const fetchInventory = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/inventory/getbyid/${inventoryId}`);
            console.log('Inventory Data:', res.data.inventory);
            setInventoryData(res.data.inventory);
        } catch (err) {
            console.log(err);
            toast.error('Không thể tải thông tin kho!');
        }
    };

    useEffect(() => {
        if (inventoryData) {
            form.setFieldsValue({
                size: inventoryData.size,
                color: inventoryData.color,
                price: inventoryData.price,
                quantity: inventoryData.quantity,
                image_url: inventoryData.image_url ? [{ url: inventoryData.image_url }] : [],
            });
            console.log("Form data set:", inventoryData);
        }
    }, [inventoryData, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('size', values.size);
            formData.append('quantity', values.quantity);
            formData.append('price', values.price);
            formData.append('color', values.color);

            if (values.image_url && values.image_url[0]) {
                formData.append('image_url', values.image_url[0].originFileObj);
            }
            await axios.put(`http://localhost:4000/api/inventory/update/${inventoryId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Cập nhật kho thành công!');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi xảy ra khi cập nhật kho!');
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
            {inventoryData ? (
                <Form
                    form={form}
                    name="edit-inventory"
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
                        rules={[{ required: true, message: 'Vui lòng tải lên ảnh!' }]}
                    >
                        <Upload name="image_url" listType="picture-card" maxCount={1} onPreview={handlePreview} beforeUpload={() => false}>
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
                            { type: 'number', min: 0, message: 'Giá không thể nhỏ hơn 0!' },
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lượng!' },
                            { type: 'number', min: 0, message: 'Số lượng không thể nhỏ hơn 0!' },
                        ]}
                    >
                        <InputNumber min={0} max={9999} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật kho hàng
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <p>Đang tải dữ liệu kho...</p>
            )}

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

export default EditInventory;
