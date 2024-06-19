import Footer from "./footer";
import Header from "./header";
import Home from "./home";
import Live from "./live";


 const Body=()=>{
     return(
        <div className="min-h-screen  text-white  bg-gradient-to-b from-0b004e to-1d152f">
            <Header  />
            <Live />
            <Home />
            
            <Footer />

        </div>
     )
 }

export default Body;