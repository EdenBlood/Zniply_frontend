import AuthLinks from '@/components/Auth/AuthLinks';
import InputSubmit from '@/components/Auth/InputSubmit';
import TitleDescription from '@/components/Auth/TitleDescription';
import ErrorMessage from '@/components/ErrorMessage';
import AuthService from '@/services/AuthService';
import type { ChangePasswordFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Seo from '@/extensions/Seo';

export default function ChangePasswordView() {
  const params = useParams();
  const token = params.token!;

  const validToken = token.length === 6;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const initialValues: ChangePasswordFormData = {
    password: '',
    password_repeat: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ChangePasswordFormData>({
    defaultValues: initialValues,
  });

  const password = watch('password');

  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.changePassword,
    onSuccess: (data) => {
      toast.success(data?.msg);
      reset();
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate(`/snippet/user/${data?.userId}`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleChangePassword = (formData: ChangePasswordFormData) => mutate({ formData, token });

  if (!validToken) {
    toast.error('Token no valido');
    return <Navigate to="/auth/forgot-password/code" />;
  }

  const metaData = {
    title: 'Cambiar Contraseña',
    description: 'Cambia tu contraseña',
    ogTitle: 'Cambiar Contraseña',
    ogDescription: 'Cambia tu contraseña',
    canonical: 'https://zniply.space/auth/change-password',
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
        title="Cambia tu contraseña"
        description="Ingresa la nueva contraseña"
        span="que deseas usar"
      />

      <form
        className="w-full px-5 space-y-2"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="uppercase text-xs font-semibold tracking-wide text-secondary"
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

        <InputSubmit
          isPending={isPending}
          values={['Cambiar Contraseña', 'Cambiando Contraseña...']}
        />
      </form>

      <AuthLinks links={['login']} />
    </>
  );
}
