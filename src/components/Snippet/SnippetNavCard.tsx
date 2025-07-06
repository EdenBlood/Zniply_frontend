import type { Snippet } from "@/types/index"
import { NavLink } from "react-router-dom"

type SnippetNavCardProps = {
  snippet: Snippet;
  to: string
}

export default function SnippetNavCard({snippet, to}: SnippetNavCardProps) {
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) => `
                p-2 rounded-md w-full max-w-full transition-colors duration-200 ${isActive ? "bg-slate-50 text-accent-violet" : "text-slate-50 hover:text-violet-300 hover:bg-slate-500/10"}`
        }>
        <div className="flex flex-col w-full">
          <h3 className="text-sm font-bold text-pretty break-words w-full">{snippet.title}</h3>
          <p className="font-normal text-xs line-clamp-1 overflow-hidden text-ellipsis opacity-90 w-full">{snippet.description}</p>
        </div>
      </NavLink>
    </>
  )
}
