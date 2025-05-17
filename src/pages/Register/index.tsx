import Form from "../../components/form";
import Logo from "../../components/layout/logo";
import Title from "../../components/layout/title";

export default function Cadastro() {
  return (
    <div className="app-container">
      <div className="app-box">
        <div className="app-content">
          <Logo />
          <Title />
          <Form />
        </div>
      </div>
    </div>
  );
}
