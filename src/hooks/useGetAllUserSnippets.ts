import SnippetService from "@/services/SnippetService";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllUserSnippets(userId: string) {
  //* Data have info of user and snippets
  const { data, isLoading, isError} = useQuery({
    queryKey: ["snippets", userId],
    queryFn: () => SnippetService.getAllUserSnippets({ userId }),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })  

  return { 
    user: data?.user ?? null, 
    snippets: data?.snippet ?? [], 
    isLoading, 
    isError
  }
}