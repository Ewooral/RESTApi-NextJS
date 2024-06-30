import React from "react";
import clsx from "clsx";

interface TextareaComponentProps {
  register: Function;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  error?: string;
  textareaId: string;
  label?: string;
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
  ...rest
}) => {
  return (
    <section className="flex flex-col gap-2 my-2">
      <label htmlFor={textareaId}>{label}</label>{" "}
      <div
        className={clsx(
          "flex items-center border border-[gray]",
          error && "border-red-500"
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
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Improved Error Handling */}
    </section>
  );
};

export default TextareaComponent;
