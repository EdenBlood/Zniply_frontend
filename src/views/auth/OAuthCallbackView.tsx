import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AuthService from '@/services/AuthService';
import Loader from '@/components/Loader';
import { toast } from 'react-toastify';

export default function OAuthCallbackView() {
  const navigate = useNavigate();

  // 1) Llamamos a tu endpoint que lee la cookie/JWT y devuelve el user
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'], // «user» en cache
    queryFn: AuthService.auth, // GET /auth/authorization
    retry: false,
    refetchOnWindowFocus: false,
  });

  // 2) Cuando llegue el user, redirigimos automáticamente
  useEffect(() => {
    if (user) {
      toast.success('Inicio de sesión exitoso');
      navigate(`/snippet/user/${user._id}`);
    } else if (isError) {
      toast.error((error as Error).message || 'OAuth falló');
      navigate('/auth/login');
    }
  }, [user, isError, error, navigate]);

  if (isLoading) return <Loader />;
  return null;
}
