import type { Snippet } from '@/types/index';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type SnippetNavCardProps = {
  snippets: Snippet[];
  favorite?: boolean;
};

export default function SnippetNavCard({ snippets, favorite }: SnippetNavCardProps) {
  const [openLanguage, setOpenLanguage] = useState<{ [lang: string]: boolean }>({});

  const toggleLanguage = (lang: string) => {
    setOpenLanguage((prev) => ({
      ...prev,
      [lang]: !prev[lang],
    }));
  };

  const languagesFIltereds = snippets.reduce((acc, snippet) => {
    const lang = snippet.language;
    if (!acc[lang.toLowerCase()]) acc[lang.toLowerCase()] = [];
    acc[lang.toLowerCase()].push(snippet);
    return acc;
  }, {} as { [key: string]: Snippet[] });

  return (
    <>
      {Object.entries(languagesFIltereds).map(([language, snippets]) => {
        const isOpen = !openLanguage[language];
        return (
          <ol key={language}>
            <li
              className={`flex justify-between p-2 w-full max-w-full text-xl bg-container/10 text-accent-yellow hover:text-violet-200 hover:bg-violet-700/20 transition-colors duration-300 cursor-pointer rounded-md`}
              onClick={() => toggleLanguage(language)}
            >
              <p className="text-sm font-bold text-pretty break-words w-full capitalize">
                {language.length <= 3 ? language.toUpperCase() : language}
              </p>
              <ChevronDownIcon
                className={`size-5 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                strokeWidth={3}
              />
            </li>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <ul className="flex flex-col gap-2">
                {snippets.map((snippet) => (
                  <li key={snippet._id} className="w-full">
                    <NavLink
                      to={
                        favorite
                          ? `/snippet/favorite/${snippet._id}`
                          : snippet.user === 'guest'
                          ? `/snippet/guest/${snippet._id}`
                          : `/snippet/user/${snippet.user}/${snippet._id}`
                      }
                      className={({ isActive }) => `
                  p-2 rounded-md w-full block transition-colors duration-300 ${
                    isActive
                      ? 'bg-slate-50 text-accent-violet'
                      : 'text-slate-200 hover:text-violet-300 hover:bg-slate-500/10'
                  }`}
                    >
                      <h3 className="text-sm font-bold text-pretty break-words w-full">
                        {snippet.title}
                      </h3>
                      <p className="font-normal text-xs line-clamp-1 overflow-hidden text-ellipsis opacity-90 w-full">
                        {snippet.description}
                      </p>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </ol>
        );
      })}
    </>
  );
}
