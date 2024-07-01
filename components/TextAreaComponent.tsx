import React, { useEffect } from "react";
import clsx from "clsx";
import { RiErrorWarningLine } from "react-icons/ri";

interface TextareaComponentProps {
  register: Function;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  error?: string;
  textareaId: string;
  label?: string;
  formState?: {
    touchedFields: Record<string, boolean>;
    dirtyFields: Record<string, boolean>;
  };
  watch: Function;
  // Add any other props you might need, similar to the `...rest` in the input component
}

const TextareaComponent: React.FC<TextareaComponentProps> = ({
  register,
  name,

  placeholder,
  disabled = false,
  icon,
  error,
  textareaId,
  label,
  watch,
  formState,

  ...rest
}) => {
  const isTouched = formState?.touchedFields[name];
  const isDirty = formState?.dirtyFields[name];
  const watchValue: string = watch(name);
  const isEmpty = watchValue?.length === 0;

  //   useEffect(() => {
  //     console.log("isTouched::", isTouched);
  //     console.log("isDirty::", isDirty)
  //     console.log("isEmpty", isEmpty);
  //     console.log("watchValue", watchValue);
  // ;

  //   }, [isEmpty, watchValue, isTouched, isDirty]);

  return (
    <section className="flex flex-col gap-2 my-2">
      <label htmlFor={textareaId}>{label}</label>{" "}
      <div
        className={clsx(
          "flex items-center border border-[gray]",
          error && "border-red-500",
          isTouched && isDirty && !error && !isEmpty && "border-green-500",
          isTouched && isDirty && isEmpty && "border-red-500"
        )}
      >
        <textarea
          {...register(name, { required: true })} // Custom validation rules
          id={textareaId}
          className={clsx(
            "p-1 outline-none bg-transparent w-full input-focused",
            disabled && "bg-[#d6d6d6]"
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...rest} // Pass the rest of the props to the textarea
        />
        {icon && <div className="input-icon">{icon}</div>}{" "}
        {/* Conditional Rendering for Icon */}
      </div>
      {error && (
        <div className="flex gap-2 justify-start items-center">
          <RiErrorWarningLine className="text-red-500 size-4" />
          <span className="text-red-500">{error}</span>
        </div>
      )}{" "}
      {/* Improved Error Handling */}
    </section>
  );
};

export default TextareaComponent;
