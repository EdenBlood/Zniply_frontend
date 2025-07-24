import InputSubmit from '@/components/Auth/InputSubmit';
import TitleDescription from '@/components/Auth/TitleDescription';
import ErrorMessage from '@/components/ErrorMessage';
import { useForm } from 'react-hook-form';
import { type LoginFormData } from '@/types/index';
import AuthService from '@/services/AuthService';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthLinks from '@/components/Auth/AuthLinks';
import Seo from '@/extensions/Seo';
import OAuthButtons from '@/components/Auth/OAuthButtons';

export default function LoginView() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({ defaultValues: initialValues });

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      toast.success(data?.msg);

      reset();

      queryClient.invalidateQueries({ queryKey: ['user'] });

      queueMicrotask(() => navigate(`/snippet/user/${data?.userId}`));
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleLogin = (formData: LoginFormData) => {
    mutate({ formData });
  };

  const metaData = {
    title: 'Iniciar Sesión',
    description: 'Inicia sesión para acceder a tus Snippets',
    ogTitle: 'Iniciar Sesión',
    ogDescription: 'Inicia sesión para acceder a tus Snippets',
    canonical: 'https://zniply.space/auth/login',
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
        title="Iniciar Sesión"
        description="Inicia sesión para acceder a tus Snippets"
        span="de código"
      />

      <form
        className="w-full px-5 space-y-4"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleLogin)}
      >
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

        <InputSubmit isPending={isPending} values={['Iniciar Sesión', 'Iniciando Sesión...']} />
      </form>

      <OAuthButtons text={'Iniciar Sesión'} />

      <AuthLinks links={['register', 'forgotPassword']} />
    </>
  );
}
