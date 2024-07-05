import React, { forwardRef, useEffect } from "react";
import clsx from "clsx";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface InputComponentProps {
  name: string;
  label: string;
  placeholder?: string;
  icon?: JSX.Element;
  inputId?: string;
  labelId?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  register?: Function;
  error?: string;
  customStyles?: string; // Step 5: New prop for custom styles
  control?: any;
  isFocused?: boolean;
  setIsFocused?: Function;
  isvalid?: boolean;
  formState?: {
    touchedFields: Record<string, boolean>;
    dirtyFields: Record<string, boolean>;
  };
  watch: Function;
  paragraphClass?: string;
  otherNotes?: string;
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
  formState,
  watch,
  paragraphClass,
  otherNotes,

  ...rest
}) => {
  // Check if the current field is touched and dirty
  const isTouched = formState?.touchedFields[name];
  const isDirty = formState?.dirtyFields[name];
  const watchValue: string = watch(name);
  const isEmpty = watchValue?.length === 0;

  return (
    <section className={`col-span-2 flex flex-col gap-2 my-2 ${customStyles}`}>
      <label htmlFor={inputId}>{label}</label>{" "}
      {/* Step 4: Enhance Accessibility */}
      <div
        className={clsx(
          "flex justify-center items-center p-1 w-full border border-[gray]",
          disabled && "bg-[#d6d6d6] cursor-not-allowed",
          customStyles, // Step 5: Apply custom styles,
          error && "border-red-500",
          isTouched &&
            isDirty &&
            !isEmpty &&
            "border-green-600 transition-all  duration-500"
        )}
      >
        {icon && (
          <div
            className={clsx(
              "input-icon text-[#a58c2a] ml-4 mr-4",
              error && "text-red-500"
            )}
          >
            {icon}
          </div>
        )}{" "}
        <input
          {...(register && register(name, { required: true }))} // Add null check before invoking register function
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
        {isDirty && !error && !isEmpty && (
          <IoCheckmarkCircleOutline
            className={clsx("size-4", !error && isDirty && "text-green-600")}
          />
        )}
        {/* Step 3: Conditional Rendering for Icon */}
      </div>
      {error && (
        <div className="flex gap-2 justify-start items-center">
          <RiErrorWarningLine className="text-red-500 size-4" />
          <span className="text-red-500">{error}</span>
        </div>
      )}{" "}
      {/* Step 6: Improved Error Handling */}
    </section>
  );
};

export const CheckboxComponent: React.FC<InputComponentProps> = ({
  name,
  label,
  inputId,
  labelId,
  disabled,
  register,
  error,
  customStyles,
  formState,
  paragraphClass,
  otherNotes,
  ...rest
}) => {
  return (
    <section
      className={`flex flex-col items-start justify-start gap-2 my-2 ${customStyles}`}
    >
      <div className="flex gap-4">
        <input
          type="checkbox"
          id={inputId}
          {...(register && register(name))}
          disabled={disabled}
          {...rest}
          className="mt-[-13.6px]"
        />
        <div className="flex flex-col">
          <label htmlFor={inputId} id={labelId}>
            {label}
          </label>
          <p className={paragraphClass}>{otherNotes}</p>
        </div>
      </div>
      {error && (
        <div className="flex gap-2 justify-start items-center">
          <RiErrorWarningLine className="text-red-500 size-4" />
          <span className="text-red-500">{error}</span>
        </div>
      )}{" "}
    </section>
  );
};

export const RadioButtonComponent: React.FC<InputComponentProps> = ({
  name,
  label,
  value,
  inputId,
  type,
  labelId,
  disabled,
  register,
  error,
  customStyles,
  formState,
  paragraphClass,
  otherNotes,
  ...rest
}) => {
  const isError = !!error;

  return (
    <section
      className={`flex flex-col items-center gap-2 my-2 ${customStyles}`}
    >
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        className="mt-[1.8px]"
        {...(register && register(name))}
        disabled={disabled}
        {...rest}
      />
      <div className="flex flex-col">
        <label htmlFor={inputId} id={labelId}>
          {label}
        </label>
        <p className={paragraphClass}>{otherNotes}</p>
      </div>
      {isError && <span className="text-red-500">{error}</span>}
    </section>
  );
};
