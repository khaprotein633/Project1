import Navbar from "../Components/Layout/Header/Navbar";
import Footer from "../Components/Layout/Footer/Footer";
import HeroSection from "../Components/Home/Hero/HeroSection";
import CollectionBox from "../Components/Home/Collection/CollectionBox";
import Trendy from "../Components/Home/Trendy/Trendy";
import DealTimer from "../Components/Home/Deal/DealTimer";
import Banner from "../Components/Home/Banner/Banner";
import LimitedEdition from "../Components/Home/Limited/LimitedEdition";


const Home = () => {
    return (
     <div>
      <Navbar/>
      <HeroSection />
      <CollectionBox/>
      <Trendy />
      <DealTimer />
      <Banner />
      <LimitedEdition />

      <Footer/>
     </div>
    );
  };

  export default Home;