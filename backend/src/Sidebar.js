import React, { useState } from 'react';
import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [active,setActive] = useState(1);

  return (
    <div className='sidebar d-flex justify-content-between flex-column bg-dark text-white p-3 vh-100'  >
        <div>
            <Link className='p-3 d-flex align-items-center text-white text-decoration-none' to={'/'}>
                 <i className='bi bi-code-slash fs-4 me-4'></i>
                <span className='fs-3'> Admin</span>
            </Link>
            <hr className='text-white'/>
            <ul className='nav nav-pills flex-column mt-2'>
                <li className= {active===1 ? 'active nav-item p-2 m-1' : 'nav-item p-2  m-1'} onClick={()=>setActive(1)} >
                    <Link className='p-1 text-white nav-link' to={'/'}>
                        <i className='bi bi-speedometer2 me-3 fs-5'></i>
                        <span className='fs-4'> Dashboard</span>
                    </Link>
                </li>
                <li  className= {active===2 ? 'active nav-item p-2 m-1' : 'nav-item p-2  m-1'} onClick={()=>setActive(2)}>
                    <Link className='p-1 text-white nav-link' to={'/user'}>
                        <i className='bi bi-people me-3 fs-5'></i>
                        <span className='fs-4'> Users</span>
                    </Link>
                </li>
                <li  className= {active===3 ? 'active nav-item p-2 m-1' : 'nav-item p-2  m-1'} onClick={()=>setActive(3)}>
                    <Link className='p-1 text-white nav-link' to={'/order'}>
                        <i className='bi bi-table me-3 fs-5'></i>
                        <span className='fs-4'> Orders</span>
                    </Link>
                </li>
                <li  className= {active===4 ? 'active nav-item p-2 m-1' : 'nav-item p-2  m-1'} onClick={()=>setActive(4)}>
                    <Link className='p-1 text-white nav-link' to={'/report'}>
                        <i className='bi bi-grid me-3 fs-5'></i>
                        <span className='fs-4'> Report</span>
                    </Link>
                </li>
            </ul>
        </div>
        <div>
            <hr className='text-white '/>
            <div className='nav-item p-2'>
                <Link className='nav-link p-1' to={'/'}> 
                    <i className='bi bi-person-circle me-3 fs-5'></i>
                    <span className='fs-4'> YouSaf</span>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Sidebar;
