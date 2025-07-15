import AuthService from '@/services/AuthService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
      window.localStorage.removeItem('Zniply_Asked');
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return { logout, isPending, isSuccess };
}
