import { Route, Routes, Navigate } from "react-router-dom";

import CustomName from "../pages/CustomName";
import Register from "../pages/Register";
import Queue from "../pages/Queue";
import ThanksPage from "../pages/ThanksPage";
import ControllerRouter from "./ControllerRouter";

export default function AppRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/nome-personalizado" element={<ControllerRouter> <CustomName/> </ControllerRouter>}/>
      <Route path="/fila" element={<ControllerRouter> <Queue/> </ControllerRouter>} />
      <Route path="/agradecimento" element={<ControllerRouter> <ThanksPage/> </ControllerRouter>} />

      {/* Rota fallback para redirecionar para a raiz (/) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}