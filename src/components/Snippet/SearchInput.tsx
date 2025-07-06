import useDebounce from "@/hooks/useDebounce";
import SnippetService from "@/services/SnippetService";
import type { Snippet } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [selected, setSelected] = useState<Snippet | null>(null);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => SnippetService.searchSnippets({search: debouncedSearch}),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!debouncedSearch.trim(),
  })

  const handleChange = (snippet: Snippet) => {
    setSelected(snippet);
    if (snippet) {
      setSearch(snippet.title);
      navigate(`/snippet/user/${snippet.user}/${snippet._id}`)
    } else {
      setSearch("")
    }
  }
  
  return (
    <>
        <Combobox value={selected} onChange={handleChange}>
          <ComboboxInput 
            aria-label="Buscar snippets"
            value={search}
            // displayValue={(results: Snippet | null) => results?.title || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            autoComplete="off"
            className={"border rounded-lg p-2 px-4 bg-container/80 text-white border-black placeholder:text-gray-300 w-88"}
            placeholder="Buscar snippets..."
          />
          <ComboboxOptions 
            anchor="bottom"
            className={"empty:invisible z-20 bg-white placeholder:text-gray-300 rounded-lg w-88 border-black border"}
          >
            { results.length > 0 ? results.map((snippet: Snippet) => (
              <ComboboxOption
                key={snippet._id}
                value={snippet}
                title={snippet.title}
                className={"data-focus:bg-container text-gray-300 data-focus:text-white data-selected:bg-slate-50 data-selected:text-accent z-20 p-3 px-4 bg-container/80 cursor-pointer transition-colors duration-200 line-clamp-1 overflow-hidden text-ellipsis"}
              >
                {snippet.title}
              </ComboboxOption>
            )) : (
              <ComboboxOption
                value="no-results"
                disabled={true}
                className={"text-gray-300 z-20 p-2 px-4 bg-container/80"}
              >
                No se encontraron resultados
              </ComboboxOption>
            )}
            { 
              isLoading && (
              <ComboboxOption
                value="loading"
                disabled={true}
                className={"text-gray-300 z-20 p-2 px-4 bg-container/80"}
              >
                Buscando...
              </ComboboxOption>
              )
            }
          </ComboboxOptions>

        </Combobox>
    </>
  )
}
