import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState(null); 
  const [redirect, setRedirect] = useState(false);
  
  const [searchbrand,setsearchbrand] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Tạo FormData để chứa dữ liệu
    const formData = new FormData();
    formData.append('brand_name', brandName);
    formData.append('brand_logo_url', brandLogo); // Thêm file logo vào form

    try {
      const res = await axios.post('http://localhost:4000/api/brand/addBrand', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Đặt header đúng định dạng
        },
      });
      console.log('Form submitted successfully:', res.data);
      toast.success('Thêm thương hiệu thành công!');
      setTimeout(() => {
        setRedirect(true);
      }, 5000);
    } catch (err) {
      console.error('Error while submitting form:', err);
      toast.error('Có lỗi xảy ra!'); // Hiển thị thông báo lỗi
    }
   
  };

  if(redirect){
    return <Navigate to={'/brand'}/>
  }
  return (
    <div className="container mt-4">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <legend>BRANDS</legend>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="product_name">
            BRAND NAME
          </label>
          <div className="col-md-4">
            <input
              id="brandname"
              placeholder="Enter Brand name"
              className="form-control input-md"
              required
              type="text"
              onChange={(e) => setBrandName(e.target.value)} // Lưu tên thương hiệu vào state
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="file_main_image">
            BRAND LOGO
          </label>
          <div className="col-md-4">
            <input
              id="file_main_image"
              name="file_main_image"
              className="input-file"
              type="file"
              onChange={(e) => setBrandLogo(e.target.files[0])} // Lưu file vào state
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-4 col-md-offset-4">
            <button id="singlebutton" name="singlebutton" className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
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
