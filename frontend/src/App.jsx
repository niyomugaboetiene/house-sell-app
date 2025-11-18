import LoginComponent from "./pages/Login"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
     <BrowserRouter>
         <Routes>
           <Route path="/login" element={<LoginComponent />}/>
         </Routes>
     </BrowserRouter>
  )
}

export default App
