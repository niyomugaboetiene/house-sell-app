import LoginComponent from "./pages/Login"
import RegisterComponent from "./pages/Register"
import HouseComponent from "./pages/AddHouse"
import HouseListComponent from "./pages/HouseList"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import HouseListComponentWithId from "./pages/HouseListWithId"
function App() {

  return (
     <BrowserRouter>
         <Routes>
           <Route path="/login" element={<LoginComponent />}/>
           <Route path="/register" element={<RegisterComponent />}/>
           <Route path="/addHouse" element={<HouseComponent />}/>
           <Route path="/allHouse" element={<HouseListComponent />} />
           <Route path="/allHouse/:_id" element={<HouseListComponentWithId />} />
         </Routes>
     </BrowserRouter>
  )
}

export default App
