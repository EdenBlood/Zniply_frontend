import Loader from "@/components/Loader";
import TipTap from "@/components/TipTap";
import { useAuthContext } from "@/hooks/useAuthContext";
import SnippetService from "@/services/SnippetService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditSnippetView() {
  const params = useParams();
  const snippetId:string = params.snippetId!
  const userId:string = params.userId! 
  
  const navigate = useNavigate();
  
  const { data: user, isLoading: authLoading } = useAuthContext()

  // no hay user
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      toast.error('No autorizado')
      navigate('/snippet/guest', {replace: true})
    } else if ( user?._id.toString() !== userId.toString() ) {
      toast.error('No autorizado');
      navigate(`/snippet/user/${user?._id}`, {replace: true})
    }
  }, [navigate, user, userId, authLoading])

  // Si no es el propietario del snippet
  useEffect(() => {
  },[user, userId, navigate])
  
  const { data: snippet, isLoading, isError, error } = useQuery({
    queryKey: ['editSnippet', snippetId],
    queryFn: () => SnippetService.getSnippetById({snippetId}),
    retry: false,
    refetchOnWindowFocus: false,
  })
  
  if (isError) return  <div>Error: {error.message}</div>;
  if (isLoading || authLoading) return <Loader />;
  if (snippet) return (
    <>
      <div className="relative overflow-y-auto">
        <TipTap contentApi={snippet} />
      </div>
    </>
  )
}
