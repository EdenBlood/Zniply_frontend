import type { PropsWithChildren } from "react";

interface ErrorMessageProps {
  className?: string;
}

export default function ErrorMessage({ children, className }: PropsWithChildren<ErrorMessageProps>) {
  return (
    <div className={`w-full bg-red-300 text-red-700 p-2 rounded-md text-center font-semibold ${className}`}>
      {children}
    </div>
  )
}
