import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;

const EditDiscount = ({ discount_id, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [discount, setDiscount] = useState(null);

    // Lấy thông tin mã giảm giá
    useEffect(() => {
        if (discount_id) {
            fetchDiscountDetails(discount_id);
        }
    }, [discount_id]);

    // Cập nhật form khi discount thay đổi
    useEffect(() => {
        if (discount) {
            form.setFieldsValue({
                discount_name: discount.discount_name,
                discount_percentage: discount.discount_percentage,
                date_range: [
                    discount.start_date ? moment(discount.start_date) : null,
                    discount.end_date ? moment(discount.end_date) : null,
                ],
            });
        }
    }, [discount, form]);

    const fetchDiscountDetails = async (id) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:4000/api/discount/get/${id}`);
            setDiscount(res.data.discount);
        } catch (error) {
            console.error('Error fetching discount details:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tải thông tin mã giảm giá.',
            });
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật mã giảm giá
    const handleSubmit = async (values) => {
        const { discount_name, discount_percentage, date_range } = values;
        const [start_date, end_date] = date_range;

        const payload = {
            discount_name,
            discount_percentage: parseInt(discount_percentage, 10),
            start_date: start_date.toISOString(),
            end_date: end_date.toISOString(),
        };

        try {
            await axios.put(`http://localhost:4000/api/discount/update/${discount_id}`, payload);
            notification.success({
                message: 'Thành công',
                description: 'Cập nhật mã giảm giá thành công!',
            });
            if (onSuccess) {
                onSuccess(); // Gọi callback khi thành công
            }
        } catch (error) {
            console.error('Error updating discount:', error);
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
            notification.error({
                message: 'Lỗi',
                description: errorMessage,
            });
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px', background: '#fff', borderRadius: 8 }}>
            <h2 style={{ textAlign: 'center' }}>Chỉnh sửa Mã Giảm Giá</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    discount_name: '',
                    discount_percentage: '',
                }}
            >
                <Form.Item
                    name="discount_name"
                    label="Tên mã giảm giá"
                    rules={[{ required: true, message: 'Vui lòng nhập tên mã giảm giá!' }]}
                >
                    <Input placeholder="Nhập tên mã giảm giá" />
                </Form.Item>

                <Form.Item
                    name="discount_percentage"
                    label="Phần trăm giảm"
                    rules={[
                        { required: true, message: 'Vui lòng nhập phần trăm giảm!' },
                        {
                            validator: (_, value) =>
                                value && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 100
                                    ? Promise.resolve()
                                    : Promise.reject('Phần trăm giảm phải từ 1 đến 100!'),
                        },
                    ]}
                >
                    <Input type="number" placeholder="Nhập phần trăm giảm" min={1} max={100} />
                </Form.Item>

                <Form.Item
                    name="date_range"
                    label="Khoảng thời gian áp dụng"
                    rules={[{ required: true, message: 'Vui lòng chọn khoảng thời gian!' }]}
                >
                    <RangePicker />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditDiscount;
