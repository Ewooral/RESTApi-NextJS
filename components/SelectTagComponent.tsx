import clsx from "clsx";

interface SelectComponentProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  register: Function;
  error?: string;
  inputId: string;
  labelId: string;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  name,
  label,
  options,
  register,
  error,
  inputId,
  labelId,
}) => {
  return (
    <section className="col-span-2 flex flex-col gap-2 my-2">
      <label htmlFor={inputId} id={labelId}>
        {label}
      </label>
      <select
        {...register(name)}
        id={inputId}
        className={clsx(
          "block w-full max-w-xs px-3 py-2 bg-white border border-[gray] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]",
          error && "border-red-500"
        )}
      >
        <option value="">Please select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-red-500">{error}</div>}
    </section>
  );
};
