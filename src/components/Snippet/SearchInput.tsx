import useDebounce from '@/hooks/useDebounce';
import SnippetService from '@/services/SnippetService';
import type { SearchSnippet } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const [selected, setSelected] = useState<SearchSnippet | null>(null);

  const {
    data: results = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => SnippetService.searchSnippets({ search: debouncedSearch }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleFocus = () => {
    if (search.trim().length >= 2) {
      refetch();
      setOpen(true);
    }
  };

  useEffect(() => {
    if (debouncedSearch.trim().length >= 2) refetch();
  }, [refetch, debouncedSearch]);

  const handleChange = (snippet: SearchSnippet) => {
    if (!snippet) return;
    setSelected(snippet);
    setSearch(snippet.title);
    setOpen(false);
    navigate(`/snippet/user/${snippet.user._id}/${snippet._id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim().length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  // cerrar si se hace click fuera del combobox
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={comboboxRef} className="relative w-full max-w-[40rem] mx-auto overflow-hidden">
        <Combobox value={selected} onChange={handleChange}>
          <ComboboxInput
            aria-label="Buscar snippets"
            // displayValue={(results: Snippet | null) => results?.title || ""}
            value={search}
            onChange={handleInputChange}
            onFocus={handleFocus}
            autoComplete="off"
            className={
              'border rounded-lg p-2 px-4 bg-container/80 text-white border-black placeholder:text-gray-300 w-full max-w-[40rem] outline-none focus:outline-none'
            }
            placeholder="Buscar snippets..."
          />
          <ComboboxOptions
            static
            hidden={!open}
            anchor="bottom"
            className={
              'empty:invisible z-20 bg-white placeholder:text-gray-300 rounded-lg w-max border-black border overflow-y-auto overflow-hidden outline-none focus:outline-none'
            }
          >
            {results.length > 0 ? (
              results.map((snippet: SearchSnippet) => (
                <ComboboxOption
                  key={snippet._id}
                  value={snippet}
                  title={snippet.title}
                  className={
                    'data-focus:bg-container outline-none focus:outline-none text-gray-100 data-focus:text-white data-selected:bg-slate-50 data-selected:text-black z-20 py-3 px-4 pb-6 bg-container/80 cursor-pointer transition-colors duration-200 overflow-hidden relative group max-w-[40rem]'
                  }
                >
                  <div className="flex flex-col overflow-hidden gap-1">
                    <p className="text-ellipsis line-clamp-1 font-bold">{snippet.title}</p>
                    <p className="text-xs text-gray-200 group-data-selected:text-black text-ellipsis line-clamp-2">
                      {snippet.description}
                    </p>
                  </div>
                  <p className="absolute px-4 bottom-1 left-0 text-xs text-gray-300 group-data-selected:text-black">
                    de{' '}
                    <span className="font-semibold text-accent-yellow group-data-selected:text-accent">
                      {snippet.user.name}
                    </span>
                  </p>
                  <p className="absolute px-4 bottom-1 right-0 text-xs text-gray-300 group-data-selected:text-black">
                    lenguaje{' '}
                    <span className="font-semibold text-accent-yellow group-data-selected:text-accent">
                      {snippet.language}
                    </span>
                  </p>
                </ComboboxOption>
              ))
            ) : isLoading ? (
              <ComboboxOption
                value="loading"
                disabled={true}
                className={'text-gray-300 z-20 p-2 px-4 bg-container/80'}
              >
                Buscando...
              </ComboboxOption>
            ) : (
              <ComboboxOption
                value="no-results"
                disabled={true}
                className={'text-gray-300 z-20 p-2 px-4 bg-container/80'}
              >
                No se encontraron resultados
              </ComboboxOption>
            )}
          </ComboboxOptions>
        </Combobox>
      </div>
    </>
  );
}
