import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import './styles/globals.css';
import './styles/customClasses.css';

export default function App() {

  return (
    <BrowserRouter>  
        <AppRoutes/>
        <ToastContainer autoClose={3000} limit={1} closeOnClick />
    </BrowserRouter>
  )
}