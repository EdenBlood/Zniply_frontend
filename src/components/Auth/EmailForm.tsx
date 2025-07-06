import type { ForgotPasswordFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface EmailFormProps {
  register: UseFormRegister<ForgotPasswordFormData>;
  errors: FieldErrors<ForgotPasswordFormData>
}

export default function EmailForm({register, errors}: EmailFormProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="uppercase text-xs font-semibold tracking-wide text-secondary">Email</label>
        <input
          id="email"
          type="email"
          className="px-4 py-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white"
          placeholder="correo@ejemplo.com"
          {...register("email", {
            required: "El Email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email no valido"
            }
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
    </>
  )
}
