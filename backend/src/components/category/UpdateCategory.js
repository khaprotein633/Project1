import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = ({ editCategory, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (editCategory) {
            form.setFieldsValue({
                category_name: editCategory.category_name
            });
        }
    }, [editCategory]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await axios.put(`http://localhost:4000/api/category/update/${editCategory._id}`, values);
            form.resetFields();
            //toast.success('Cập nhật thành công!');
            if (onSuccess) {
                onSuccess(res.data); 
            }
           
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || 'Có lỗi xảy ra!');
            } else {
                toast.error('Có lỗi xảy ra!');
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                form={form}
                name="update-category"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên danh mục"
                    name="category_name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateCategory;
