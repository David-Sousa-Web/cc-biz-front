import React, { useState } from "react";
import "../styles/form.css";
import PrivacyNotice from "./layout/privacyNotice";
import LocationNotice from "./layout/location";


const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    setFormData((prev) => ({ ...prev, cpf: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-subtitle">Cadastro</h2>
      <div className="form-group">
        <label htmlFor="name">Nome completo</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Endereço de e-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="exemplo@email.com"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleCpfChange}
          placeholder="000.000.000-00"
          maxLength={14}
          required
        />
      </div>
      <PrivacyNotice />
      <LocationNotice />
      <button type="submit" className="submit-button">
        Continuar
      </button>
    </form>
  );
};

export default Form;
