import React, { useState } from 'react';
import './assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="sidebar d-flex flex-column bg-dark text-white p-3 vh-100">
      {/* Phần tiêu đề */}
      <div>
        <Link className="p-3 d-flex align-items-center text-white text-decoration-none" to={'/'}>
          <i className="bi bi-house-door-fill fs-4 me-4"></i>
          <span className="fs-3"> Admin</span>
        </Link>
        <hr className="text-white" />
      </div>

      {/* Phần menu với cuộn */}
      <div className="menu-container flex-grow-1 overflow-auto">
        <ul className="nav nav-pills flex-column mt-2">
          <li className={active === 1 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(1)}>
            <Link className="p-1 text-white nav-link" to={'/'}>
              <i className="bi bi-speedometer2 me-3 fs-5"></i>
              <span className="fs-4"> Dashboard</span>
            </Link>
          </li>
          <li className={active === 2 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(2)}>
            <Link className="p-1 text-white nav-link" to={'/brand'}>
              <i className="bi bi-star-fill me-3 fs-5"></i>
              <span className="fs-4"> Brands</span>
            </Link>
          </li>
          <li className={active === 3 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(3)}>
            <Link className="p-1 text-white nav-link" to={'/user'}>
              <i className="bi bi-people-fill me-3 fs-5"></i>
              <span className="fs-4"> Users</span>
            </Link>
          </li>
          <li className={active === 4 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(4)}>
            <Link className="p-1 text-white nav-link" to={'/product'}>
              <i className="bi bi-box-seam me-3 fs-5"></i>
              <span className="fs-4"> Products</span>
            </Link>
          </li>
          <li className={active === 5 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(5)}>
            <Link className="p-1 text-white nav-link" to={'/category'}>
              <i className="bi bi-tags-fill me-3 fs-5"></i>
              <span className="fs-4"> Categories</span>
            </Link>
          </li>
          <li className={active === 6 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(6)}>
            <Link className="p-1 text-white nav-link" to={'/order'}>
              <i className="bi bi-card-checklist me-3 fs-5"></i>
              <span className="fs-4"> Orders</span>
            </Link>
          </li>
          <li className={active === 7 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(7)}>
            <Link className="p-1 text-white nav-link" to={'/comments'}>
              <i className="bi bi-chat-dots me-3 fs-5"></i>
              <span className="fs-4"> Comments</span>
            </Link>
          </li>
          <li className={active === 8 ? 'active nav-item p-2 m-1' : 'nav-item p-2 m-1'} onClick={() => setActive(8)}>
            <Link className="p-1 text-white nav-link" to={'/discount'}>
              <i className="bi bi-percent me-3 fs-5"></i>
              <span className="fs-4"> Discounts</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Phần người dùng */}
      <div>
        <hr className="text-white" />
        <div className="nav-item p-2">
          <Link className="nav-link p-1" to={'/'}>
            <i className="bi bi-person-circle me-3 fs-5"></i>
            <span className="fs-4"> YouSaf</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
