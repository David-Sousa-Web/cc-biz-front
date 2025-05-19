import api from "./config/axiosConfig";

export interface ICreateCustomName {
  custom_name: string;
  user_latitude: number;
  user_longitude: number;
}

const CreateCustomName = async (bodyReq: ICreateCustomName) => {
  console.log('call function API');
  console.log(bodyReq)

  const response = await api.post('/custom-name', bodyReq)
  console.log(response)
  return response.data
}

const CreateCustomNameService = {
  CreateCustomName
}

export default CreateCustomNameService;