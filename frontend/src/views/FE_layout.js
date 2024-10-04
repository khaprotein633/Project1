import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import file CSS của Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import file JS của Bootstrap (bao gồm Popper.js)
import Navbar from './Navbar';
import Content_layout from './Content_layout';

const FE_layout = () => {
  return (
    <>
    <body>
    {/* <!-- Navigation--> */}
    <Navbar/>
    {/* <!-- Header--> */}
    <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
                <h1 className="display-4 fw-bolder">Shop in style</h1>
                <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
            </div>
        </div>
    </header>
    {/* <!-- Section--> */}
   <Content_layout/>
    {/* <!-- Footer--> */}
    <footer className="py-5 bg-dark">
        <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
    </footer>
    
</body>
</>
  )
}

export default FE_layout
