import { useEffect, useState } from "react";
import Logo from "../../components/layout/logo";
import { getFirstUserPosition } from "../../utils/getUserPositions";

export default function Queue() {
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      const pos = await getFirstUserPosition();
      setPosition(pos);
    };

    fetchPosition();
  }, []);

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
