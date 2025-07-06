import Loader from "@/components/Loader"
import SnippetHeader from "@/components/Snippet/SnippetHeader"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { toast } from "react-toastify"

export default function AppLayout() {
  const {data, isLoading} = useAuthContext()
  
  const isGuest = data ? false : true

  useEffect(() => {
    if (!data) return
    const alreadyAsked = localStorage.getItem('Zniply_Asked')
    const guestSnippetsRaw = localStorage.getItem("Zniply_Guest_Snippets");

    if (!alreadyAsked && guestSnippetsRaw) {
      try {
        const guestSnippets = JSON.parse(guestSnippetsRaw);
  
        if (guestSnippets.length > 0) {
          const confirm = window.confirm("¿Tienes snippets como invitado, quiere almacenarlos en esta cuenta?")
  
          if (confirm) {
            //* creamos los snippets

            localStorage.removeItem("Zniply_Guest_Snippets");
            toast.success('Snippets guardados en tu cuanta correctamente')
          } else {
            toast.info('Los snippets siguen en localStorage')
          }
        } else {
          return
        }
  
        localStorage.setItem('Zniply_Asked', 'true')
      } catch (error) {
        toast.error('Snippets en localStorage corrompidos')
        console.log(error)
      }
    }
  },[data])
  
  if (isLoading) return <Loader />
  return (
    <>
      <div className='w-full h-screen grid grid-rows-[auto_1fr_auto] gap-4'>
        <SnippetHeader isGuest={isGuest}/>        

        <div className='flex flex-row gap-6 overflow-hidden w-6xl mx-auto'>
          <Outlet />
        </div>

        <footer className='text-white pb-0.5'>
          <div className='text-center text-xs'>Todos los derechos reservados a EdenBlood</div>
        </footer>
      </div>
    </>
  )
}