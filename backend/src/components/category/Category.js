import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Category = () => {

  const [listcategories, setlistcategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize] = useState(5); 
  const [total, setTotal] = useState(0); 
  useEffect (()=>{
      fetchCategory();
  });
  const fetchCategory = async (page = currentPage) => {
    try {
        const res = await axios.get(`http://localhost:4000/api/categories/getAllCategories`  
        );
        setlistcategories(res.data.Category);
        //setTotal(res.data.total);
    } catch (err) {
        console.log(err);
    }
};
  return (
    <div>
      
    </div>
  )
}

export default Category
