import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const CreateBrand = ({ onSuccess }) => {
  const [form] = Form.useForm(); // Sử dụng hook form của Ant Design
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    // Tạo FormData để chứa dữ liệu
    const formData = new FormData();
    formData.append('brand_name', values.brand_name); // Lấy giá trị từ Ant Design Form
    if (values.brand_logo && values.brand_logo[0]?.originFileObj) {
      formData.append('brand_logo', values.brand_logo[0].originFileObj); // Lấy file upload từ Ant Design Form
    }

    try {
      const res = await axios.post('http://localhost:4000/api/brand/addBrand', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      form.resetFields(); // Reset form sau khi thêm thành công
      if (onSuccess) {
        onSuccess();
      }
      toast.success('Thêm thương hiệu thành công!');
    } catch (err) {
      console.error('Error while submitting form:', err);
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Form
        form={form}
        name="create-brand"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Tên thương hiệu"
          name="brand_name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên thương hiệu!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Logo thương hiệu"
          name="brand_logo"
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
          rules={[
            {
              required: true,
              message: 'Vui lòng tải lên logo thương hiệu!',
            },
          ]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Tải lên logo</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm thương hiệu
          </Button>
        </Form.Item>
      </Form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CreateBrand;
