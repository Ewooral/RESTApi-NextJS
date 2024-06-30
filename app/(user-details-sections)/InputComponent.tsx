import React, { forwardRef, useEffect } from "react";
import clsx from "clsx";

interface InputComponentProps {
  name: string;
  label: string;
  placeholder?: string;
  icon?: JSX.Element;
  inputId: string;
  labelId: string;
  type: string;
  disabled?: boolean;
  register: Function;
  error?: string;
  customStyles?: string; // Step 5: New prop for custom styles
  control?: any;
  isFocused?: boolean;
  setIsFocused?: Function;
  isvalid?: boolean;
}

// eslint-disable-next-line react/display-name
export const InputComponent: React.FC<InputComponentProps> = ({
  name,
  label,
  placeholder,
  icon,
  inputId,
  labelId,
  type,
  disabled,
  register,
  error,
  customStyles, // Step 5: Use the new prop for custom styles
  control,
  isFocused,
  setIsFocused,
  isvalid,

  ...rest
}) => {
  return (
    <section className={`col-span-2 flex flex-col gap-2 my-2 ${customStyles}`}>
      <label htmlFor={inputId}>{label}</label>{" "}
      {/* Step 4: Enhance Accessibility */}
      <div
        className={clsx(
          "flex justify-center items-center p-1 w-full border border-[gray]",
          disabled && "bg-[#d6d6d6] cursor-not-allowed",
          customStyles, // Step 5: Apply custom styles,
          error && "border-red-500"
        )}
      >
        <input
          {...register(name, { required: true })} // Step 2: Update registration with custom validation rules
          id={inputId}
          className={clsx(
            "p-1 outline-none bg-transparent w-full  input-focused",
            disabled && "bg-[#d6d6d6]"
          )}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          // required
          {...rest} // Ensure rest of the props are passed to the input
        />
        {icon && (
          <div
            className={clsx(
              "input-icon text-[#a58c2a]",
              error && "text-red-500"
            )}
          >
            {icon}
          </div>
        )}{" "}
        {/* Step 3: Conditional Rendering for Icon */}
      </div>
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Step 6: Improved Error Handling */}
    </section>
  );
};
