import TitleDescription from '@/components/Auth/TitleDescription';
import ErrorMessage from '@/components/ErrorMessage';
import { useForm } from 'react-hook-form';
import { type CreateAccountFormData } from '@/types/index';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/services/AuthService';
import { toast } from 'react-toastify';
import InputSubmit from '@/components/Auth/InputSubmit';
import AuthLinks from '@/components/Auth/AuthLinks';
import Seo from '@/extensions/Seo';
import OAuthButtons from '@/components/Auth/OAuthButtons';

export default function CreateAccountView() {
  const initialValues: CreateAccountFormData = {
    name: '',
    email: '',
    password: '',
    password_repeat: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CreateAccountFormData>({ defaultValues: initialValues });

  const password = watch('password');

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.createAccount,
    onSuccess: (msg) => {
      toast.success(msg);
      reset();
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleCreateAccount = (formData: CreateAccountFormData) => mutate({ formData });

  const metaData = {
    title: 'Crear Cuenta Nueva',
    description: 'Crea tu cuenta y empieza a almacenar tus Snippets',
    ogTitle: 'Crear Cuenta Nueva',
    ogDescription: 'Crea tu cuenta y empieza a almacenar tus Snippets',
    canonical: 'https://zniply.space/auth/create-account',
  };

  return (
    <>
      <Seo
        title={metaData.title}
        description={metaData.description}
        ogTitle={metaData.ogTitle}
        ogDescription={metaData.ogDescription}
        canonical={metaData.canonical}
      />

      <TitleDescription
        title="Crea tu cuenta"
        description="Crea tu cuenta y empieza a almacenar tus Snippets"
        span="de código"
      />

      <form
        className="w-full px-5 space-y-2"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleCreateAccount)}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="uppercase text-xs font-semibold tracking-wide text-secondary"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
            placeholder="Tu nombre"
            {...register('name', {
              required: 'El Nombre es obligatorio',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres',
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="uppercase text-xs font-semibold tracking-wide text-secondary
            "
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
            placeholder="correo@ejemplo.com"
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email no valido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="uppercase text-xs font-semibold tracking-wide text-secondary
            "
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
            placeholder="********"
            {...register('password', {
              required: 'El password es obligatorio',
              minLength: {
                value: 8,
                message: 'El password debe tener al menos 8 caracteres',
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password_repeat"
            className="uppercase text-xs font-semibold tracking-wide text-secondary
            "
          >
            Repetir Contraseña
          </label>
          <input
            id="password_repeat"
            type="password"
            className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
            placeholder="********"
            {...register('password_repeat', {
              required: 'El password es obligatorio',
              minLength: {
                value: 8,
                message: 'El password debe tener al menos 8 caracteres',
              },
              validate: {
                matchPassword: (value: string) =>
                  value === password || 'Las contraseñas no coinciden',
              },
            })}
          />
          {errors.password_repeat && <ErrorMessage>{errors.password_repeat.message}</ErrorMessage>}
        </div>

        <InputSubmit isPending={isPending} values={['Crear Cuenta', 'Creando Cuenta...']} />
      </form>

      <OAuthButtons text={'Regístrate'} />

      <AuthLinks links={['login', 'forgotPassword', 'resendCode']} />
    </>
  );
}
