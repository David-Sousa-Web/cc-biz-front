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
            <h1 className="main-title">Seu nome já apareceu na lata</h1>
            <h2 className="sub-title">Obrigado por sua participação!</h2>
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
