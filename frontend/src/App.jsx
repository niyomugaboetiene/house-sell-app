import LoginComponent from "./pages/Login"
import RegisterComponent from "./pages/Register"
import HouseComponent from "./pages/AddHouse"
import HouseListComponent from "./pages/HouseList"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home"
import Navs from "./pages/Navs"
import HouseListComponentWithId from "./pages/HouseListWithId"
import HouseForRent from "./pages/HouseForRent"
import MyCart from "./pages/MyCart"
import HouseForSell from "./pages/HouseForSell"
import MyProperties from "./pages/sellerHouse"
import UpdateHouseComponent from "./pages/UpdateHouse"
import Footer from "./pages/Footer"
import SearchResults from "./pages/SearchBar"
import AllAddedToCart from "./pages/AllAddedProduct"
import UpdateUserComponent from "./pages/UpdateUser"

function App() {

  return (
     <BrowserRouter>
         <Routes>
          <Route element={<Navs/>}>
              <Route path="/" element={<HomePage />}/>
              <Route path="/login" element={<LoginComponent />}/>
              <Route path="/register" element={<RegisterComponent />}/>
              <Route path="/addHouse" element={<HouseComponent />}/>
              <Route path="/allHouse" element={<HouseListComponent />} />
              <Route path="/allHouse/:_id" element={<HouseListComponentWithId />} />
              <Route path="/myCart" element={<MyCart />}/>
              <Route path="/rent" element={<HouseForRent />}/>
              <Route path="/buy" element={<HouseForSell />}/>
              <Route path="/myProperties" element={<MyProperties />}/>
              <Route path="/update/:_id" element={<UpdateHouseComponent />}/>
              <Route path="/search" element={<SearchResults />}/>
              <Route path="/updateUser" element={<UpdateUserComponent />}/>
              <Route path="/allCart" element={<AllAddedToCart />}/>
          </Route>
         </Routes>
        <Footer />
     </BrowserRouter>
  )
}

export default App
