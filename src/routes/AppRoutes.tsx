import { Route, Routes } from "react-router-dom";

import CustomName from "../pages/CustomName";
import Register from "../pages/Register";

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/nome-personalizado" element={<CustomName/>}/>
    </Routes>
  )
}