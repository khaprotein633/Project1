import Navbar from "../Components/Layout/Header/Navbar";
import Footer from "../Components/Layout/Footer/Footer";
import HeroSection from "../Components/Home/Hero/HeroSection";
import CollectionBox from "../Components/Home/Collection/CollectionBox";
import Trendy from "../Components/Home/Trendy/Trendy";
import DealTimer from "../Components/Home/Deal/DealTimer";
import Banner from "../Components/Home/Banner/Banner";
import LimitedEdition from "../Components/Home/Limited/LimitedEdition";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../Redux/actions/product";


const Home = () => {
  const { allProducts } = useSelector((state) => state.product);
  const {user} = useSelector((state)=> state)
  console.log("user in nav",user);
  // console.log(allProducts)

    return (
    {user} && <div>
      <Navbar/>
      <HeroSection />
      <CollectionBox/>
      {allProducts && <Trendy allProducts={allProducts}/>}

      <DealTimer />
      <Banner />
      <LimitedEdition />

      <Footer/>
     </div>
    );
  };

  export default Home;