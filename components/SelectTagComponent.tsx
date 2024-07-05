import clsx from "clsx";
import { RiErrorWarningLine } from "react-icons/ri";

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
        {options.map((option, index) => (
          <option key={index} value={option.label}>
            {option.value}
          </option>
        ))}
      </select>
      {error && (
        <div className="flex gap-2 justify-start items-center">
          <RiErrorWarningLine className="text-red-500 size-4" />
          <span className="text-red-500">{error}</span>
        </div>
      )}{" "}
    </section>
  );
};

export const SelectComponent_: React.FC<SelectComponentProps> = ({
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
          "block w-full max-w-xs px-3 py-2 bg-white border border-[gray] focus:outline-none",
          error && "border-red-500"
        )}
      >
        <option value="">Please select a title</option>
        {options.map((title, index) => (
          <option key={index} value={title.value}>
            {title.value}
          </option>
        ))}
      </select>
      {error && (
        <div className="flex gap-2 justify-start items-center">
          <RiErrorWarningLine className="text-red-500 size-4" />
          <span className="text-red-500">{error}</span>
        </div>
      )}{" "}
    </section>
  );
};
