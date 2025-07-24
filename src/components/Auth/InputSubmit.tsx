type InputSubmitProps = {
  isPending: boolean;
  values: string[];
};

export default function InputSubmit({ isPending, values }: InputSubmitProps) {
  return (
    <>
      <input
        type="submit"
        className="w-full my-2 py-3 rounded-md hover:rounded-3xl bg-accent hover:bg-accent-yellow text-primary-font font-semibold transform duration-300 cursor-pointer hover:text-black disabled:cursor-not-allowed hover:scale-105 disabled:bg-accent-violet disabled:text-gray-400 disabled:hover:bg-accent-violet disabled:hover:text-gray-400 disabled:hover:scale-100"
        value={isPending ? values[1] : values[0]}
        disabled={isPending}
      />
    </>
  );
}
