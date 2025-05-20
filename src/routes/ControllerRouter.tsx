import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

interface ControllerRouterProps {
  children: ReactNode;
}

export default function ControllerRouter({ children }: ControllerRouterProps) {
  const tokenCookie = Cookies.get('cocatoken');
  const idUserCookie = Cookies.get('userIdCocaBiz');

  // Se NÃO tiver token, manda pra tela de cadastro
  if (!tokenCookie || !idUserCookie) {
    return <Navigate to="/" replace />;
  }

  // Se tiver token, mostra a rota normalmente
  return <>{children}</>;
}
