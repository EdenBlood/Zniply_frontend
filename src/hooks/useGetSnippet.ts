import SnippetService from "@/services/SnippetService"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useAuthContext } from "./useAuthContext";



export default function useGetSnippet(snippetId : string) {
  const { data: user } = useAuthContext()
  
  const { data: snippet, isLoading, isError } = useQuery({
    queryKey: ["snippet", snippetId],
    queryFn: () => SnippetService.getSnippetById({ snippetId }),
    retry: false,
    refetchOnWindowFocus: false,
  })
  
  const isOwnerSnippet = useMemo(() => user?._id.toString() === snippet?.user.toString(), [snippet, user])

  return {snippet, isLoading, isError, isOwnerSnippet}
}