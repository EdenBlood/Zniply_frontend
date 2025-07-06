import Loader from "@/components/Loader";
import TipTap from "@/components/TipTap";
import { useAuthContext } from "@/hooks/useAuthContext";
import SnippetService from "@/services/SnippetService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditSnippetView() {
  const params = useParams();
  const snippetId:string = params.snippetId!
  const userId:string = params.userId! 
  
  const { data: user } = useAuthContext()
  
  const { data: snippet, isLoading, isError, error } = useQuery({
    queryKey: ['editSnippet', snippetId],
    queryFn: () => SnippetService.getSnippetById({snippetId}),
    retry: false,
    refetchOnWindowFocus: false,
  })

  if ( user?._id.toString() !== userId.toString() ) {
    toast.error('No autorizado');
    <Navigate to={`/snippet/user/${user?._id}`} />
  }
  if (isError) return  <div>Error: {error.message}</div>;
  if (isLoading) return <Loader />;
  if (snippet) return (
    <>
      <div className="relative overflow-y-auto">
        <TipTap contentApi={snippet} />
      </div>
    </>
  )
}
