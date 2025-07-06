import { Link } from "react-router-dom";

const linksNav: {[key:string]: string} = {
  login: '/auth/login',
  register: '/auth/create-account',
  forgotPassword: '/auth/forgot-password',
  confirmAccount: '/auth/confirm-account',
  resendCode: '/auth/resend-code',
}

const linksText: {[key:string]: string} = {
  login: '¿Ya tienes una cuenta? Iniciar Sesión',
  register: '¿No tienes una cuenta? Registrarse',
  forgotPassword: '¿Olvidaste tu contraseña?',
  confirmAccount: '¿No recibiste el código de confirmación?',
  resendCode: '¿No recibiste el código de confirmación?',
}

type AuthLinksProps = {
  links: string[];
}

export default function AuthLinks({links}: AuthLinksProps) {
  return (
    <nav className="flex flex-col gap-2 items-center">
      {links.map((link: string) => (
        <Link 
          className="text-xs text-center text-container/80 hover:text-container hover:scale-105 duration-300 transform"
          key={link} 
          to={linksNav[link]}
        >
          {linksText[link]}
        </Link>
      ))}
    </nav>
  )
}
