import Loader from "@/components/Loader";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Link, Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { data, isLoading } = useAuthContext()
  
  if (isLoading) return <Loader />
  if (data) return <Navigate to={`/snippet/user/${data._id}`} replace />
  return (
    <div className="flex justify-center w-screen min-h-screen">

      <div className="bg-transparent w-8 border-l-8 border-white hidden md:block" />

      <div className="w-96 max-w-[95vw] bg-white flex flex-col items-center justify-center">
        <header className="text-center">
          <h1 className="text-7xl my-6 font-extrabold tracking-wider text-primary drop-shadow-lg">
            <Link to={"/inicio"}>Zniply</Link>
          </h1>
          {/* <p className="text-md font-semibold text-secondary">Crea tus propios snippets de código</p> */}
        </header>

        <main className="w-full h-full flex flex-col justify-center items-center space-y-2 my-2">
          <Outlet />
        </main>
      </div>

      <div className="bg-transparent w-8 border-r-8 border-white hidden md:block" />
    </div>
  )
}
