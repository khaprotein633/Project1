import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, notification } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;

const CreateDiscount = ({ onSuccess }) => {
    const [form] = Form.useForm(); // Ant Design Form instance

    const handleSubmit = async (values) => {
        const { discount_name, discount_percentage, date_range } = values;
        const [start_date, end_date] = date_range;

        const payload = {
            discount_name,
            discount_percentage: parseInt(discount_percentage, 10), // Đảm bảo là số nguyên
            start_date: start_date.toISOString(),
            end_date: end_date.toISOString(),
        };

        try {
            // Gửi request POST để tạo mã giảm giá mới
            await axios.post('http://localhost:4000/api/discount/add', payload);
            form.resetFields();
            notification.success({
                message: 'Thành công',
                description: 'Thêm mã giảm giá thành công!',
            });
            if (onSuccess) {
                onSuccess(); // Gọi callback khi thành công
            }
        } catch (error) {
            console.error('Error creating discount:', error);
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
            notification.error({
                message: 'Lỗi',
                description: errorMessage,
            });
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px', background: '#fff', borderRadius: 8 }}>
            <h2 style={{ textAlign: 'center' }}>Tạo Mã Giảm Giá</h2>
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
                    <Button type="primary" htmlType="submit" block>
                        Tạo mã giảm giá
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateDiscount;
