import { Route, Routes } from "react-router-dom";

import CustomName from "../pages/CustomName";
import Register from "../pages/Register";
import Queue from "../pages/Queue";
import ThanksPage from "../pages/ThanksPage";

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/nome-personalizado" element={<CustomName/>}/>
      <Route path="/fila" element={<Queue/>} />
      <Route path="/agradecimento" element={<ThanksPage/>} />
    </Routes>
  )
}