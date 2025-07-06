import type { ConfirmTokenFormData } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import Spinner from "@/components/Spinner";

type TokenFormProps = {
  handleChange: (token: ConfirmTokenFormData["token"]) => void;
  handleComplete: (token: ConfirmTokenFormData["token"]) => void
  token: ConfirmTokenFormData["token"]
  isPending: boolean
}

export default function TokenForm({ handleChange, handleComplete, token, isPending }: TokenFormProps) {

  return (
    <div className="my-4">
      {
        isPending
          ? (
            <Spinner />
          )
          : (
            <form className="space-y-2">
              <p className="text-center">Código de 6 dígitos</p>
              <div className="flex justify-center gap-1">
                <PinInput aria-label="Código de 6 Digitos" value={token} onChange={handleChange} onComplete={handleComplete}>
                  <PinInputField className="text-center size-10 p-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white" />
                  <PinInputField className="text-center size-10 p-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white" />
                  <PinInputField className="text-center size-10 p-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white" />
                  <PinInputField className="text-center size-10 p-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white" />
                  <PinInputField className="text-center size-10 p-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white" />
                  <PinInputField className="text-center size-10 p-3 rounded-md bg-container/80 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-accent-violet focus:outline-none text-white" />
                </ PinInput>
              </div>
            </form>
          )
      }
    </div>
  )
}