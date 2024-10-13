import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Brand = () => {
    const [listbrand, setlistbrand] = useState([]);
    const [createbrand, setcreatebrand] = useState(false);
    const [edit, setedit] = useState(false);
    const [idedit, setidedit] = useState(null);
    const [newBrandName, setNewBrandName] = useState('');
    const [newBrandLogo, setNewBrandLogo] = useState(null);
    const [searchbrand, setsearchbrand] = useState('');


    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/brand/getAllBrands');
            setlistbrand(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (createbrand) {
        return <Navigate to={'/createbrand'} />;
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchbrand.trim()) {
            fetchBrands();
            return;
        }
        try {
            const res = await axios.get(`http://localhost:4000/api/brand/getbrandbyname/${searchbrand}`);
            setlistbrand(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (item) => {
        setedit(true);
        setidedit(item.brand_id);
        setNewBrandLogo(item.brand_logo_url);
        setNewBrandName(item.brand_name);
    };

    const handleSave = async (item) => {
        const formData = new FormData();
        formData.append('brand_id', item.brand_id);
        formData.append('brand_name', newBrandName);
        if (newBrandLogo instanceof File) {
            formData.append('brand_logo_url', newBrandLogo);
        }
        try {
            const res = await axios.put(`http://localhost:4000/api/brand/updatebrand/${item.brand_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Brand updated successfully:', res.data);
            fetchBrands();
            setedit(false);
        } catch (err) {
            console.error('Error while updating brand:', err);
        }
    };

    const handleDelete = async (item) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa thương hiệu ${item.brand_name}?`);
        if (!confirmDelete) {
            return;
        }

        try {
            const res = await axios.delete(`http://localhost:4000/api/brand/deletebrand/${item.brand_id}`);
            console.log('Brand deleted successfully:', res.data);
            toast.success('Xóa thương hiệu thành công!');
            fetchBrands();
        } catch (err) {
            console.error('Error while deleting brand:', err);
            toast.error('Có lỗi xảy ra khi xóa thương hiệu!');
        }
    };

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Brands List</a>
                <form className="d-flex" onSubmit={handleSearch}>
                    <input
                        className="form-control mr-sm-2 me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchbrand}
                        onChange={(e) => setsearchbrand(e.target.value)}
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>

            <table className="table table-striped table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>LOGO</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listbrand.map((item) => (
                        <tr key={item.brand_id}>
                            {edit === true && idedit === item.brand_id ? (
                                <>
                                    <td>{item.brand_id}</td>
                                    <td>
                                        <input
                                            type="file"
                                            onChange={(e) => setNewBrandLogo(e.target.files[0])}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={newBrandName}
                                            onChange={(e) => setNewBrandName(e.target.value)}
                                            placeholder="Brand name"
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => handleSave(item)}>
                                            Save
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{item.brand_id}</td>
                                    <td>
                                        <img
                                            src={item.brand_logo_url}
                                            alt={item.brand_name}
                                            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                            onClick={() => handleImageClick(item.brand_logo_url)}
                                        />
                                    </td>
                                    <td>{item.brand_name}</td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary" onClick={() => setcreatebrand(true)}>
                    Add Brand
                </button>
            </div>

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

export default Brand;
