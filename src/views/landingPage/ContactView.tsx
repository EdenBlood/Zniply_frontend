import InputSubmit from '@/components/Auth/InputSubmit';
import ErrorMessage from '@/components/ErrorMessage';
import Seo from '@/extensions/Seo';
import type { ContactFormData } from '@/types/index';
import { useForm } from 'react-hook-form';

export default function ContactView() {
  const initialValues: ContactFormData = {
    asunto: '',
    name: '',
    email: '',
    message: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: initialValues,
  });

  const handleContact = (formData: ContactFormData) => {
    console.log(formData);
  };

  return (
    <>
      <Seo
        title="Contacto"
        description="Contacto con nosotros | Zniply"
        ogTitle="Contacto | Zniply"
        ogDescription="Contacto con nosotros | Zniply"
        canonical="https://zniply.space/contact"
      />

      <main className="w-6xl mx-auto py-18 pb-10 min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-8xl title font-bold text-slate-50 drop-shadow-md drop-shadow-slate-200/50 text-center">
          Contacto
        </h1>

        <form
          onSubmit={handleSubmit(handleContact)}
          autoComplete="off"
          noValidate
          className="w-2xl bg-slate-900/90 shadow-xl p-8 rounded-md"
        >
          <fieldset className="space-y-2">
            <legend className="text-2xl font-bold text-slate-50 mb-10">
              Completa el formulario y mantengámonos en contacto
            </legend>

            <div className="flex flex-col gap-2">
              <label
                className="uppercase text-xs font-semibold tracking-wide text-secondary text-slate-50"
                htmlFor="asunto"
              >
                Asunto
              </label>
              <input
                className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
                placeholder="Tu asunto..."
                type="text"
                id="asunto"
                {...register('asunto', {
                  required: 'El asunto es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El asunto debe tener al menos 3 caracteres',
                  },
                })}
              />
              {errors.asunto && <ErrorMessage>{errors.asunto.message}</ErrorMessage>}
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="uppercase text-xs font-semibold tracking-wide text-secondary text-slate-50"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
                placeholder="Tu nombre..."
                type="text"
                id="name"
                {...register('name', {
                  required: 'El nombre es obligatorio',
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
                className="uppercase text-xs font-semibold tracking-wide text-secondary text-slate-50"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
                placeholder="correo@ejemplo.com"
                type="email"
                id="email"
                {...register('email', {
                  required: 'El email es obligatorio',
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
                className="uppercase text-xs font-semibold tracking-wide text-secondary text-slate-50"
                htmlFor="message"
              >
                Mensaje
              </label>
              <textarea
                className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
                id="message"
                placeholder="Mensaje del Email..."
                {...register('message', {
                  required: 'El mensaje es obligatorio',
                  minLength: {
                    value: 10,
                    message: 'El mensaje debe tener al menos 10 caracteres',
                  },
                })}
              />
              {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
            </div>

            <InputSubmit isPending={false} values={['Enviar', 'Enviando...']} />
          </fieldset>
        </form>
      </main>
    </>
  );
}
