import QueueService from "../api/getQueuePositionService";
import Cookies from "js-cookie";


export const getFirstUserPosition = async (): Promise<number | null> => {
  const userId = Cookies.get('userIdCocaBiz');

  if (!userId) {
    console.warn("Usuário não autenticado.");
    return null;
  }

  try {
    const response = await QueueService.GetQueue();
    const queue = response.data;

    const userPositions = queue
      .filter(item => item.userId === Number(userId))
      .map(item => item.position);

    if (userPositions.length === 0) return null;

    // Pega a menor posição (primeira)
    return Math.min(...userPositions);
  } catch (error) {
    console.error("Erro ao buscar a fila:", error);
    return null;
  }
};

