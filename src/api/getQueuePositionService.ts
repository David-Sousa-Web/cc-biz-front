import api from "./config/axiosConfig";

export interface IQueueItem {
  position: number;
  nameId: number;
  userId: number;
  custom_name: string;
}

export interface IQueueResponse {
  success: boolean;
  message: string;
  data: IQueueItem[];
}

const GetQueue = async (): Promise<IQueueResponse> => {
  console.log('Call function API - GetQueue');

  const response = await api.get('/queue');
  console.log(response);

  return response.data;
};

const QueueService = {
  GetQueue,
};

export default QueueService;
