import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/body";
import CoinData from "./components/coinData";


const App=()=>{
   return(
     <div>
        <Router>
      <div className="min-h-screen text-white bg-gradient-to-b from-0b004e to-1d152f">
        
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/coins/:Id" element={<CoinData />} />
          
        
        </Routes>
      </div>
    </Router>
     </div>
   )
}

export default App;