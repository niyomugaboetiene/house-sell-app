import LoginComponent from "./pages/Login"
import RegisterComponent from "./pages/Register"
import HouseComponent from "./pages/AddHouse"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
     <BrowserRouter>
         <Routes>
           <Route path="/login" element={<LoginComponent />}/>
           <Route path="/register" element={<RegisterComponent />}/>
           <Route path="/addHouse" element={<HouseComponent />}/>
         </Routes>
     </BrowserRouter>
  )
}

export default App
