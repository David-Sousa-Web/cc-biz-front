import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import './styles/App.css';
import './styles/root.css';

export default function App() {

  return (
    <BrowserRouter>  
        <AppRoutes/>
        <ToastContainer autoClose={3000} limit={1} closeOnClick />
    </BrowserRouter>
  )
}