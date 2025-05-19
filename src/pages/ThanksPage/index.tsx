import { useNavigate } from "react-router-dom";
import Logo from "../../components/layout/logo";


export default function ThanksPage() {
  const navigate = useNavigate()

  const HandleNavigate = () => {
    navigate('/nome-personalizado')
  }

  return (
    <div className="app-container">
      <div className="app-box">
        <div className="app-content">
          <div>
            <Logo />
            <h1 className="main-title">Obrigado por sua participação!</h1>
          </div>
          
          <div>
            <h1 className="main-title">Deseja fazer um novo nome na lata?</h1>
            <button onClick={HandleNavigate} className="submit-button">
              sim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
