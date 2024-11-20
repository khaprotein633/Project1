import Navbar from "../Components/Layout/Header/Navbar";
import Footer from "../Components/Layout/Footer/Footer";
import HeroSection from "../Components/Home/Hero/HeroSection";
import CollectionBox from "../Components/Home/Collection/CollectionBox";
import Trendy from "../Components/Home/Trendy/Trendy";
import DealTimer from "../Components/Home/Deal/DealTimer";
import Banner from "../Components/Home/Banner/Banner";
import LimitedEdition from "../Components/Home/Limited/LimitedEdition";
import { useSelector } from "react-redux";
import UserProfile from "../Components/Profile/UserProfile";
import { useEffect } from "react";



const ProfilePage = () => {
    const { user } = useSelector((state) => state.user)
    console.log("user in nav", user);
    // console.log(allProducts)
    useEffect(()=>{

    },[user])
    return (
        <div>
            <Navbar />
            <UserProfile userProps={user} />
            <Footer />
        </div>
    );
};

export default ProfilePage;