import api from "./config/axiosConfig";

export interface RegisterUser {
  name: string;
  email: string;
  cpf: string;
}

const Register = async(bodyReq: RegisterUser) => {
  console.log('call function API');
  console.log(bodyReq)
  
  const response = await api.post('/register-user', bodyReq)

  return response.data
}

const RegisterUserService = {
  Register
}

export default RegisterUserService;