import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './components/home/Users';

import Orders from './components/home/Orders';
import NotFoundPage from './components/home/NotFoundPage';
import Home from './components/home/Home';
import Brand from './components/brand/Brand';
import CreateBrand from './components/brand/CreateBrand';
import User from './components/user/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />, // Trang lỗi
    children: [ // Định nghĩa các trang con bên trong App
      {
        index: true, // Thiết lập trang mặc định
        element: <Home />
      },
      {
        path: "brand",
        element: <Brand />
      },
      {
        path: "createbrand",
        element: <CreateBrand />
      },
      {
        path: "user",
        element: <User/>
      },
      {
        path: "order",
        element: <Orders />
      },
      {
        path: "report",
        element: <h1>Xin chào</h1>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
