import { useEffect, useState } from "react";
import Logo from "../../components/layout/logo";
import { getFirstUserPosition } from "../../utils/getUserPositions";
import { useNavigate } from "react-router-dom";

const REFRESH_INTERVAL = 20000; // 20 segundos em ms

export default function Queue() {
  const [position, setPosition] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosition = async () => {
      const pos = await getFirstUserPosition();

      if (pos === null) {
        navigate("/agradecimento");
      } else {
        setPosition(pos);
      }
    };

    // Executa a primeira vez ao montar
    fetchPosition();

    // Reexecuta a cada 2 minutos
    const intervalId = setInterval(fetchPosition, REFRESH_INTERVAL);

    // Limpa o intervalo ao desmontar
    return () => clearInterval(intervalId);
  }, [navigate]);
  
  return (
    <div className="app-container">
      <div className="app-box">
        <div className="queue-container">
          <Logo />
          <h1 className="main-title">Seu nome irá aparecer em breve</h1>
          <div className="queue-content ">
            <h2 className="">Sua posição na fila:</h2>
            <span className="">{position}</span>
            <p className="">Existem outros nomes antes do seu</p>
            <span className=""> Por favor aguarde</span>
          </div>
        </div>
      </div>
    </div>
  );
}
