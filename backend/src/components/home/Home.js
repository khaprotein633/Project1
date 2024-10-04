import React from 'react'
import PieChart from '../partials/PieChart'
import LineChart from '../partials/LineChart'

const Home = () => {
    return (
        <>
            <div className='p-5 bg-light'>
    <div className='container-fluid'>
        <div className='row gy-3'>
            {/* Sales Card */}
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='d-flex justify-content-around align-items-center py-4 px-2 bg-white border border-secondary shadow-sm'>
                    <i className='bi bi-currency-dollar fs-1 text-success'></i>
                    <div>
                        <span>Sales</span>
                        <h2>234</h2>
                    </div>
                </div>
            </div>

            {/* Increase Card */}
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='d-flex justify-content-around align-items-center py-4 px-2 bg-white border border-secondary shadow-sm'>
                    <i className='bi bi-graph-up-arrow fs-1 text-danger'></i>
                    <div>
                        <span>Increase</span>
                        <h2>20%</h2>
                    </div>
                </div>
            </div>

            {/* Delivery Card */}
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='d-flex justify-content-around align-items-center py-4 px-2 bg-white border border-secondary shadow-sm'>
                    <i className='bi bi-truck fs-1 text-primary'></i>
                    <div>
                        <span>Delivery</span>
                        <h2>80</h2>
                    </div>
                </div>
            </div>

            {/* Users Card */}
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
                <div className='d-flex justify-content-around align-items-center py-4 px-2 bg-white border border-secondary shadow-sm'>
                    <i className='bi bi-people fs-1 text-warning'></i>
                    <div>
                        <span>Users</span>
                        <h2>150</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className='row gy-3'>
            <div className='col-12 col-md-8 p-3'>
                <LineChart/>
            </div>
            <div className='col-12 col-md-8 p-3'>
                <LineChart/>
            </div>
            <div className='col-12 col-md-8 p-3'>
                <LineChart/>
            </div>
            <div className='col-12 col-md-8 p-3'>
                <LineChart/>
            </div>
        </div>
    </div>
</div>

        </>
    )
}

export default Home
