import {
  CheckboxComponent,
  InputComponent,
} from "@/app/(user-details-sections)/InputComponent";
import { usePersonalForm, useSignUpForm } from "@/hooks/usePersonalInfoForm";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoPersonCircleOutline } from "react-icons/io5";
import { DevTool } from "@hookform/devtools";
import {
  SelectComponent,
  SelectComponent_,
} from "@/components/SelectTagComponent";
import userStore from "@/store";
import {
  MdMarkEmailRead,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService_POSTGRES } from "@/services/userService";
import { useCustomToast } from "@/hooks/useToast";

type AddUserFormProps = {
  register: any;
  watch: any;
  formState: any;
  dialogRef?: React.RefObject<HTMLDialogElement>;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  handleSubmit: any;
};

const AddUserForm: React.FC<AddUserFormProps> = ({
  dialogRef,
  primaryButtonText = "Add User",
  secondaryButtonText = "Cancel",
  onPrimaryAction,
  onSecondaryAction,
}) => {
  const { register, control, watch, handleSubmit, reset, formState } =
    useSignUpForm();
    const { showErrorToast, showSuccessToast } = useCustomToast();

  const { errors } = formState;
  const { title } = userStore();

  async function createUser(data: FieldValues){
    const res = await userService_POSTGRES.signUp(data);
    console.log("User added!", res?.data);
    showSuccessToast("User created Successfully", res?.data.message);
    onPrimaryAction?.(); // Assuming this is the action you want to trigger on form submit
    dialogRef?.current?.close();

  }


  const queryClient = useQueryClient();
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries("createAUserNow");
    },
  
  })

  async function onSubmit(data: FieldValues) {
    // const res = await userService_POSTGRES.signUp(data);
    // console.log("User added!", res?.data);
    // onPrimaryAction?.(); // Assuming this is the action you want to trigger on form submit
    // dialogRef?.current?.close();
    try{
      await createUserMutation.mutateAsync(data);
    }
    catch(error){
      console.error("Error adding user", error);
      showErrorToast("Error", "Failed to add user");
    }
  }

  const titleOptions = Object.entries(title).map(([_, title]) => ({
    value: title,
    label: title,
  }));

  return (
    <>
      <form
        action={""}
        onSubmit={handleSubmit(onSubmit) as SubmitHandler<FieldValues>}
      >
        <div className="border-b"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 p-5 ">
            <InputComponent
              register={register}
              label="First Name"
              placeholder="Enter your first name"
              name="firstname"
              error={errors.firstname?.message}
              icon={<IoPersonCircleOutline className="size-5" />}
              watch={watch}
              inputId="firstname"
              labelId="firstname"
              type="text"
              formState={formState}
            />

            <InputComponent
              register={register}
              label="Last Name"
              placeholder="Enter your last name"
              name="lastname"
              error={errors.lastname?.message}
              icon={<MdOutlineDriveFileRenameOutline className="size-5" />}
              watch={watch}
              inputId="lastname"
              labelId="lastname"
              type="text"
              formState={formState}
            />

            <InputComponent
              register={register}
              label="Email"
              placeholder="Enter your email"
              name="email"
              error={errors.email?.message}
              icon={<MdMarkEmailRead className="size-5" />}
              watch={watch}
              inputId="email"
              labelId="email"
              type="email"
              formState={formState}
            />
          </div>
          <div className="col-span-1 p-5 ">
            <InputComponent
              register={register}
              label="Password"
              placeholder="Enter your password"
              name="password"
              error={errors.password?.message}
              icon={<RiLockPasswordLine className="size-5" />}
              watch={watch}
              inputId="password"
              labelId="password"
              type="password"
              formState={formState}
            />

            <SelectComponent_
              name="title"
              label="Title"
              options={titleOptions}
              register={register}
              error={errors.title?.message}
              inputId="title"
              labelId="title"
            />

            <CheckboxComponent
              register={register}
              label="Accept terms and conditions"
              name="terms"
              customStyles="outline-none"
              error={errors.terms?.message}
              watch={watch}
              inputId="terms"
              labelId="terms"
              type="checkbox"
              formState={formState}
              otherNotes="You agree to our Terms of Service and Privacy Policy."
              paragraphClass="text-[10px] text-muted-foreground"
            />

            <CheckboxComponent
              register={register}
              label="Are you a student?"
              name="isstudent"
              customStyles="outline-none"
              error={errors.isStudent?.message}
              watch={watch}
              inputId="isstudent"
              labelId="isstudent"
              type="checkbox"
              formState={formState}
              otherNotes="Kindly check this box if you are a student, thanks!"
              paragraphClass="text-[10px] text-muted-foreground"
            />
          </div>
          <div className="col-span-2 border-b"></div>
          <div className="p-5">
            <FaUserPlus className="size-11 mt-[.5rem] text-blue-500" />
          </div>
          <div className="flex justify-end gap-4 mt-4 p-5 ">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 transition duration-300">
              {primaryButtonText}
            </button>
            <button
              onClick={() => {
                onSecondaryAction?.();
                dialogRef?.current?.close();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
            >
              {secondaryButtonText}
            </button>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default AddUserForm;
