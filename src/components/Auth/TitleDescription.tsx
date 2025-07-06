
type TitleDescriptionProps = {
  title: string;
  description: string;
  span?: string;
  className?: string;
}

export default function TitleDescription({ title, description, span, className }: TitleDescriptionProps) {
  return (
    <>
      <div className={`text-center px-2 ${className}`}>
        <h1 className="text-5xl font-bold text-accent">{title}</h1>
        <p className="font-semibold text-primary text-lg text-pretty">{description} {' '}<span className="text-accent-violet">{span}</span></p>
      </div>
    </>
  )
}
