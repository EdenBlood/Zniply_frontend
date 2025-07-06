import { useAuthContext } from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function SnippetHeaderAuth() {
  const navigate = useNavigate();

  const { logout, isPending } = useLogout();
  const { data: user } = useAuthContext();


  if (!user) return (
    <>
      <button
        className='font-semibold text-xl py-1 text-container/80 hover:text-accent transition-colors duration-300 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer'
        disabled={isPending}
        onClick={() => navigate('/auth/create-account')}>
        Registrarse
      </button>
      <button
        className='font-semibold text-xl py-1 text-container/80 hover:text-accent transition-colors duration-300 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer'
        disabled={isPending}
        onClick={() => navigate('/auth/login')}>
        Iniciar Sesión
      </button>
    </>
  )
  return (
    <>
      <p className='font-semibold text-xl py-1 text-container/80'>
        Hola {user.name}!
      </p>
      <button
        className='font-semibold text-xl py-1 text-red-700 hover:text-red-600 transition-colors duration-300 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:cursor-not-allowed cursor-pointer'
        disabled={isPending}
        onClick={() => logout()}>
        {isPending ? "Cerrando Sesión..." : "Cerrar Sesión"}
      </button>
    </>
  )
}
