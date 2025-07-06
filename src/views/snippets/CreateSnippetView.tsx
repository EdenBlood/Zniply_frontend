import TipTap from "@/components/TipTap";

type CreateSnippetViewProps = {
  isGuest?: boolean
}

export default function CreateSnippetView({isGuest}: CreateSnippetViewProps) {
  return (
    <>
      <div className="relative overflow-y-auto">
        <TipTap isGuest={isGuest} />
      </div>
    </>
  )
}