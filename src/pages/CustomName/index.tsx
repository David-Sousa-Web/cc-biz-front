import { useEffect, useState } from "react";
import Logo from "../../components/layout/logo";
import '../../styles/custom-name.css'
import type { ICreateCustomName } from "../../api/createCustomNameService";
import CreateCustomNameService from "../../api/createCustomNameService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import silhuetaImage from '../../assets/images/Lata Borda Preta.png'

export default function CustomName() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ICreateCustomName>({
    custom_name: '',
    user_latitude: 0,
    user_longitude: 0
  })

  useEffect(() => {
    function getGeoLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const geoLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            setFormData((prev) => ({
              ...prev,
              user_latitude: geoLocation.latitude,
              user_longitude: geoLocation.longitude,
            }));
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.log('Permissão de localização negada.');
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Localização indisponível.");
                break;
              default:
                console.log('Erro desconhecido.');
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 60000
          }
        );
      } else {
        console.error("Geolocalização não suportada pelo navegador.");
      }
    }

    getGeoLocation();
  }, []);




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

  function nameIsValid(value: string): boolean {
    // Validação principal: permite apenas letras, espaços e caracteres acentuados
    if (/[^a-zA-ZÀ-ÿ\s]/gi.test(value)) return false;

    // Impede espaço no início
    if (value.startsWith(' ')) return false;

    // Impede múltiplos espaços consecutivos
    if (/(\s{2,})/.test(value)) return false;

    return true;
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    if (!nameIsValid(newValue)) {
      return;
    }

    handleChangeForm(e);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bodyReq = {... formData};
      console.log(bodyReq)

      const response = await CreateCustomNameService.CreateCustomName(bodyReq);

      if(response.message === 'successful created Names') {
        toast.success('Nome personalizado criado com sucesso!')

        navigate('/fila')
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        toast.error(error.response?.data.error.message)
      } else {
        toast.error('erro inesperado')
      }
    }
  }

  return (
    <div className="app-container">
      <div className="app-box">
        <div className="app-content">
          <Logo/>
          
          <form onSubmit={handleSubmit} className="custom-name-content">
            <h1 className="main-title">Coloque o nome que aparecera na lata</h1>

            <div className="custom-name-wrapper">
              <img src={silhuetaImage} className="lata-bg" alt="lata" />

              <span
                className="input-outline"
                style={{ opacity: formData.custom_name.trim() === '' ? 0.5 : 1 }}
              >
                {(formData.custom_name || 'Nome').replace(/ /g, '\u00A0')}
              </span>

              <input 
                className="custom-name-input"
                id="custom_name"
                type="text"
                value={formData.custom_name}
                onChange={handleChangeName}
                placeholder="Nome"
                minLength={3}
                maxLength={12}
                required
                autoComplete="off"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>

            <button type="submit" className="submit-button custom-name-button">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
