import TitleDescription from '@/components/Auth/TitleDescription'
import { useState } from 'react';
import { type ConfirmTokenFormData } from '@/types/index';
import TokenForm from '@/components/Auth/TokenForm';
import AuthService from '@/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthLinks from '@/components/Auth/AuthLinks';
import Seo from '@/extensions/Seo';

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

  const metaData = {
    title: "Confirmar Token",
    description: "Ingresa el token que te enviamos a tu correo electrónico",
    ogTitle: "Confirmar Token",
    ogDescription: "Ingresa el token que te enviamos a tu correo electrónico",
    canonical: "https://zniply.space/auth/confirm-token"
  }
  return (
    <>
      <Seo title={metaData.title} description={metaData.description} ogTitle={metaData.ogTitle} ogDescription={metaData.ogDescription} canonical={metaData.canonical} />

      <TitleDescription title="Confirmar Token" description="Ingresa el token que te enviamos a" span="tu correo electrónico" className="space-y-2"/>

      <TokenForm handleChange={handleChange} handleComplete={handleComplete} token={token} isPending={isPending}/>

      <AuthLinks links={['login', 'forgotPassword', 'resendCode']} />
    </>
  )
}
