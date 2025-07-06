import SnippetService from "@/services/SnippetService"
import { useQuery } from "@tanstack/react-query"

export default function useGetAllSnippets() {
  const { data: snippets, isLoading, isError } = useQuery({
    queryKey: ["snippets"],
    queryFn: SnippetService.getSnippets,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })

  return {snippets, isLoading, isError}
}