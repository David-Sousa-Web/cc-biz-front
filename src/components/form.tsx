import React, { useEffect, useState } from "react";
import "../styles/form.css";
import LocationNotice from "./layout/location";
import { useNavigate } from "react-router-dom";
import type { RegisterUser } from "../api/registerUserService";
import { InputCPF } from "./layout/form/InputCPF";
import { InputName } from "./layout/form/InputName";
import { toast } from "react-toastify";
import RegisterUserService from "../api/registerUserService";
import Cookies from "js-cookie";
import { AxiosError } from "axios";


type ValidationErrorKeys = 'name' | 'email' | 'cpf';

export type ValidationErrors = {
  name: string[];
  email: string[];
  cpf: string[];
};

const Form: React.FC = () => {
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        name: [],
        email: [],
        cpf: []
    });
  const [errorsRender, setErrorsRender] = useState<string[]>([]);
  const [showTerms, setShowTerms] = useState(false);

  const [formData, setFormData] = useState<RegisterUser>({
    name: "",
    email: "",
    cpf: "",
  });

  useEffect(()=> {
    function structuringErrorsRender() {
      const errors: string[] = [];

      for (const key in validationErrors) {
        const typedKey = key as ValidationErrorKeys;
        errors.push(...validationErrors[typedKey]);
      }

      setErrorsRender(errors);
    }
    structuringErrorsRender()
  }, [validationErrors]);

  function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    // console.log(id, value)
    
    // Checagem inicial:
    if(!id) {
        console.warn('ID do input alvo não foi definido')
        return;
    }

    if(!Object.hasOwn(formData, id)) {
        console.warn(`ID "${id}" do input alvo não é compátivel com o state de formulario`)
        return;
    }
    // Atualiza state
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleShowTerms() {
      if(!loadingSubmit) {
          setShowTerms(true);
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);

    if(formData.cpf.length < 14) {
      setValidationErrors(prev => ({...prev, cpf: ['CPF incompleto']}));
      toast.warn('Preencha o formulário corretamente');
      setLoadingSubmit(false);
      return;
    }

    try {
      const bodyReq = {...formData};
      bodyReq.cpf = bodyReq.cpf.replace(/\D/g, '');

      const response = await RegisterUserService.Register(bodyReq);

      if(response.message === 'successful created user') {
        const token = response.token;
        const userId = response.userId;
        
        Cookies.set('cocatoken', token, {
          secure: true,
          sameSite: "Strict"
        })
        Cookies.set('userIdCocaBiz', userId, {
          secure: true,
          sameSite: 'Strict'
        })

        toast.success('Cadastro realizado com sucesso');

        navigate('/nome-personalizado')
      }
    }
    catch(error) {
      if(error instanceof AxiosError) {
        toast.error(error.response?.data.error.message)
      }else {
        toast.error('erro inesperado')
      }
    }

    setLoadingSubmit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-subtitle">Cadastro</h2>
      <div className="form-group">
        <label htmlFor="name">Nome completo</label>
        <InputName 
          id="name" 
          value={formData.name} 
          setValue={handleChangeForm}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Endereço de e-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChangeForm}
          placeholder="exemplo@email.com"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpf">CPF</label>
        <InputCPF 
          id="cpf"
          value={formData.cpf}
          setValue={handleChangeForm}
          placeholder='000.000.000-00'
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
        />
      </div>

      {errorsRender.length > 0 && (
        <div className="msg_feedback error">
          {errorsRender.map((item, idx)=> (
            <p className="item" key={idx}>
              <i className="bi bi-exclamation-circle"></i>
              <span> {item}</span>
            </p>
          ))}
        </div>
      )}

      <div className="privacy-notice">
        <p>
          Ao se cadastrar, você concorda com os termos de nossa{" "}
          <span className="highlight" onClick={handleShowTerms}>Política de Privacidade</span>.
        </p>
      </div>
      <LocationNotice />
      <button type="submit" className="submit-button">
        {loadingSubmit ? (
          'Cadastrando...'
        ) : (
          'Continuar'
        )}
      </button>
    </form>
  );
};

export default Form;
