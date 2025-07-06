import { createContext } from "react";
import { useAuth } from "@/hooks/useAuth";
import { type UserAuth } from "@/types/index";
import { type ReactNode } from "react";

interface AuthContextType {
  data: UserAuth | null | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  data: null,
  isLoading: true,
  isError: false
})

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const {data, isLoading, isError} = useAuth()

  return (
    <AuthContext.Provider value={{
      data,
      isLoading,
      isError
    }}>
      {children}
    </AuthContext.Provider>
  )
}