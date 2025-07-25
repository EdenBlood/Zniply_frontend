import InputSubmit from "@/components/Auth/InputSubmit";
import TitleDescription from "@/components/Auth/TitleDescription";
import { useForm } from "react-hook-form";
import { type ForgotPasswordFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";
import EmailForm from "@/components/Auth/EmailForm";
import AuthLinks from "@/components/Auth/AuthLinks";
import Seo from "@/extensions/Seo";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordFormData = { email: "" }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>({
    defaultValues: initialValues
  })

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: (msg) => {
      toast.success(msg);
      reset()
    },
    onError: ({ message }) => {
      toast.error(message);
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordFormData) => mutate({ formData })

  const metaData = {
    title: "Olvide mi contraseña",
    description: "Si olvidaste tu contraseña, no te preocupes, solo ingresa tu correo electrónico y te enviaremos un correo con instrucciones para recuperarla",
    ogTitle: "Olvide mi contraseña",
    ogDescription: "Si olvidaste tu contraseña, no te preocupes, solo ingresa tu correo electrónico y te enviaremos un correo con instrucciones para recuperarla",
    canonical: "https://zniply.space/auth/forgot-password"
  }

  return (
    <>
      <Seo title={metaData.title} description={metaData.description} ogTitle={metaData.ogTitle} ogDescription={metaData.ogDescription} canonical={metaData.canonical} />


      <TitleDescription title="¿Olvidaste tu contraseña?" description="No te preocupes, solo ingresa tu correo electrónico y te enviaremos un correo con instrucciones para" span="recuperar tu contraseña" className="space-y-2" />

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

      <AuthLinks links={['login', 'register']} />
    </>
  )
}
