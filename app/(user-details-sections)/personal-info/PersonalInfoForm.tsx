import React, { useEffect } from "react";
import { InputComponent } from "../InputComponent"; // Adjust the import path as necessary
import DynamicButton from "@/components/CustomButton";
import { BsGenderFemale, BsFillSendCheckFill } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import { PiGlobeSimpleXLight } from "react-icons/pi";
import { MdDriveFileRenameOutline, MdLocationOn } from "react-icons/md";
import { MdOutlineAddIcCall } from "react-icons/md";
import { PiPhonePlusThin } from "react-icons/pi";
import { DevTool } from "@hookform/devtools";
import clsx from "clsx";
import { HomeIcon } from "@heroicons/react/24/outline";
import { FieldValues } from "react-hook-form";
import { usePersonalForm } from "@/hooks/usePersonalInfoForm";
import axios from "axios";
import { SelectComponent } from "@/components/SelectTagComponent";
import { genderOptions } from "@/data/data";
import TextareaComponent from "@/components/TextAreaComponent";

type PersonalInfoFormProps = {
  onSubmitPersonalForm?: any;
  isButtonLoading?: boolean;
  usePersonalForm?: Function;
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = usePersonalForm();

  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log("logging...");
      setIsButtonLoading(true);

      const res = await axios.post(
        "/api/user-profile/update-user-details",
        data
      );
      setIsButtonLoading(false);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 my-2 text-xs"
      >
        {/* TAKES THE WHOLE COL SPAN 4/4 */}
        <h3 className="font-extrabold  col-span-4 text-xs bg-white text-[#a58c2a]">
          Personal Information
        </h3>

        {/* TAKES 2/4 */}
        <div className="col-span-2 my-2 mx-2">
          {/* Middle Name */}
          <InputComponent
            register={register}
            name="middle_name"
            label="Middle Name"
            placeholder="Enter your Middle Name"
            icon={<MdDriveFileRenameOutline className="size-4" />}
            inputId="middle_name"
            labelId="middle_name"
            type="text"
            error={errors.middle_name?.message}
          />

          {/* Date of Birth */}
          <InputComponent
            name="date_of_birth"
            register={register}
            label="Date of Birth"
            placeholder="Enter your Date of Birth"
            inputId="date_of_birth"
            labelId="date_of_birth"
            type="date"
            disabled={false}
            error={errors.date_of_birth?.message}
          />

          {/* Gender */}
          <SelectComponent
            name="gender"
            label="Gender"
            options={genderOptions}
            register={register}
            error={errors.gender?.message}
            inputId="gender-select"
            labelId="gender-label"
          />

          {/* Nationality */}
          <InputComponent
            register={register}
            name="nationality"
            label="Nationality"
            placeholder="Enter your Nationality"
            icon={<PiGlobeSimpleXLight className="size-4" />}
            inputId="nationality"
            labelId="nationality"
            type="text"
            error={errors.nationality?.message}
          />
          <TextareaComponent
            register={register}
            name="student_support"
            label="other information"
            placeholder="other information"
            // icon={<MdLocationOn className="size-4" />}
            textareaId="student_support"
            error={errors.student_support?.message}
          />
        </div>

        {/* TAKES 2/4 */}
        <div className="col-span-2 my-2  mx-2">
          {/* Username */}
          <InputComponent
            register={register}
            name="username"
            label="Username"
            placeholder="Enter your Username"
            icon={<FiUserCheck className="size-4" />}
            inputId="username"
            labelId="username"
            type="text"
            error={errors.username?.message}
          />

          {/*Home Address */}
          <InputComponent
            register={register}
            name="home_address"
            label="Home Address"
            placeholder="Enter your home address"
            icon={<HomeIcon className="size-4" />}
            inputId="home_address"
            labelId="home_address"
            type="text"
            error={errors.home_address?.message}
          />

          {/* Emergency_contact_information */}
          <InputComponent
            register={register}
            name="Emergency_contact_information"
            label="Emerg.. Contact Info"
            placeholder="Enter your emerg... "
            icon={<PiPhonePlusThin className="size-4" />}
            inputId="Emergency_contact_information"
            labelId="Emergency_contact_information"
            type="text"
            error={errors.Emergency_contact_information?.message}
          />
          {/* Phone Number */}
          <InputComponent
            register={register}
            name="phone_number"
            label="Phone Number"
            placeholder="Enter your phone number"
            icon={<MdOutlineAddIcCall className="size-4" />}
            inputId="phone_number"
            labelId="phone_number"
            type="text"
            error={errors.phone_number?.message}
          />

          <TextareaComponent
            register={register}
            name="student_support"
            label="other information"
            placeholder="other information"
            // icon={<MdLocationOn className="size-4" />}
            textareaId="student_support"
            error={errors.student_support?.message}
          />
        </div>

        {/* BUTTON */}
        <div className="col-span-4 my-2">
          <DynamicButton
            className={clsx("px-1")}
            label={isButtonLoading ? "Saving..." : "Save"}
            icon={<BsFillSendCheckFill className="size-4 text-white" />}
            isLoading={isButtonLoading}
            type="submit"
          />
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default PersonalInfoForm;
