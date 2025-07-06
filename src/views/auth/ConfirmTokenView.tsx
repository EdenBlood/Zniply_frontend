import TitleDescription from '@/components/Auth/TitleDescription'
import { useState } from 'react';
import { type ConfirmTokenFormData } from '@/types/index';
import TokenForm from '@/components/Auth/TokenForm';
import AuthService from '@/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthLinks from '@/components/Auth/AuthLinks';

export default function ConfirmToken() {
  const [token, setToken] = useState<ConfirmTokenFormData['token']>("")

  const navigate = useNavigate()
  
  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.confirmAccount,
    onSuccess: (msg) => {
      toast.success(msg)
      setToken("");
      navigate("/auth/login")
    },
    onError: ({message}) => {
      toast.error(message)
    }
  })

  const handleChange = (token: ConfirmTokenFormData['token']) => setToken(token)
  
  const handleComplete = (token: ConfirmTokenFormData['token']) => mutate({token})
  return (
    <>
      <TitleDescription title="Confirmar Token" description="Ingresa el token que te enviamos a" span="tu correo electrónico" className="space-y-2"/>

      <TokenForm handleChange={handleChange} handleComplete={handleComplete} token={token} isPending={isPending}/>

      <AuthLinks links={['login', 'forgotPassword', 'resendCode']} />
    </>
  )
}
