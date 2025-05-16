import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Register />}/>
    </Routes>
  )
}