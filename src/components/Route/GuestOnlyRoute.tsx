import { useAuthContext } from "@/hooks/useAuthContext"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "../Loader"

export default function GuestOnlyRoute() {
  const { data: user, isLoading: authLoading } = useAuthContext()
  
  if (authLoading) return <Loader />
  if (user) return <Navigate to={`/snippet/user/${user._id}`} />
  return <Outlet />;
}