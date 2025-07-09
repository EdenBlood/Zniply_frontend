import Loader from "@/components/Loader";
import GuestSidebar from "@/components/Snippet/GuestSidebar";
import MySidebar from "@/components/Snippet/MySidebar";
import OtherUserSideBar from "@/components/Snippet/OtherUserSideBar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet, useParams } from "react-router-dom";

type SidebarLayoutProps = {
  isGuest?: boolean
}

export default function SidebarLayout({ isGuest }: SidebarLayoutProps) {
  const params = useParams()
  const userId: string | null = params.userId || null

  const { data: user, isLoading } = useAuthContext()

  if (isLoading) return <Loader />
  if (!isGuest && userId === null && user) return <Navigate to={`/snippet/user/${user._id}`} replace/>
  return (
    <>
      {
        !isGuest ? (

          user?._id !== userId 
          ? <OtherUserSideBar userId={userId!} /> 
          : <MySidebar />
          
        ) : (
          <GuestSidebar />
        )
      }
      <main className="w-full overflow-y-auto rounded-xl">
        <Outlet />
      </main>
    </>
  )
}
