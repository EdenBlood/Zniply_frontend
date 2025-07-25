import InputSubmit from "@/components/Auth/InputSubmit";
import TitleDescription from "@/components/Auth/TitleDescription";
import { useForm } from "react-hook-form";
import { type ResendCodeFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";
import EmailForm from "@/components/Auth/EmailForm";
import AuthLinks from "@/components/Auth/AuthLinks";
import Seo from "@/extensions/Seo";


export default function ResendCodeView() {


  const initialValues: ResendCodeFormData = { email: "" }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ResendCodeFormData>({
    defaultValues: initialValues
  })

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.resendCode,
    onSuccess: (msg) => {
      toast.success(msg);
      reset();
    },
    onError: ({ message }) => {
      toast.error(message);
    }
  })

  const handleForgotPassword = (formData: ResendCodeFormData) => mutate({ formData })
  
  const metaData = {
    title: "Reenviar Código de Verificación",
    description: "Si no recibiste el código de verificación, ingresa tu correo electrónico y te enviaremos ",
    ogTitle: "Reenviar Código de Verificación",
    ogDescription: "Si no recibiste el código de verificación, ingresa tu correo electrónico y te enviaremos ",
    canonical: "https://zniply.space/auth/resend-code"  
  }
  return (
    <>
      <Seo title={metaData.title} description={metaData.description} ogTitle={metaData.ogTitle} ogDescription={metaData.ogDescription} canonical={metaData.canonical} />


      <TitleDescription title="Reenviar código de verificación" description="Si no recibiste el código de verificación, ingresa tu correo electrónico y te enviaremos " span="un nuevo código" className="space-y-2" />

      <form
        className="w-full px-5 space-y-4"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <EmailForm register={register} errors={errors} />

        <InputSubmit
          isPending={isPending}
          values={["Enviar", "Enviando..."]}
        />
      </form>

      <AuthLinks links={['login', 'forgotPassword', 'register']} />
    </>
  )
}
