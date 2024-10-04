import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/partials/Navbar'
import Home from './components/home/Home'
import { Outlet } from 'react-router-dom'

function App() {
  const [toggle,setToggle] = useState(false);
  const Toggle=()=>{
    setToggle(!toggle);
  }
  useEffect (()=>{
    const hanldeSize=()=>{
      if(window.innerWidth>768){
        setToggle(false);
      }
    }
      window.addEventListener('resize',hanldeSize);
      return ()=>{
        window.removeEventListener('resize',hanldeSize);
      }
    
    
  },[])
  return (
    <div className='d-flex'>
      <div className={toggle ? 'd-none' : 'w-auto position-fixed'}>
        <Sidebar />
      </div>
      <div className={toggle ? 'd-none' : 'invisible'}>
        <Sidebar />
      </div>
      <div className='col overflow-auto'>
        <Navbar Toggle={Toggle}/>
          <Outlet /> {/* Đây là nơi các trang con sẽ được hiển thị */}
        
      </div>
    </div>
  )
}

export default App
