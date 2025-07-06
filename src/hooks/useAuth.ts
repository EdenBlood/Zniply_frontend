import AuthService from '@/services/AuthService';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const {data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: AuthService.auth,
    refetchOnWindowFocus: false,
    retry: false,
  })

  return {data, isLoading, isError}
}
