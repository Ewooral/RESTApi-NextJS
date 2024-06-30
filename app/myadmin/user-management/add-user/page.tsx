"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios"; // Assuming axios is used for API requests
import { usePersonalForm } from "@/hooks/usePersonalInfoForm";
import { InputComponent } from "@/app/(user-details-sections)/InputComponent";
import { BsGenderFemale, BsFillSendCheckFill } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import { PiGlobeSimpleXLight } from "react-icons/pi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineAddIcCall } from "react-icons/md";
import { PiPhonePlusThin } from "react-icons/pi";
import { HomeIcon } from "lucide-react";
import DynamicButton from "@/components/CustomButton";
import clsx from "clsx";
import { SelectComponent } from "@/components/SelectTagComponent";
import { genderOptions } from "@/data/data";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = usePersonalForm();

  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  // Function to submit form data
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-4 my-2 text-xs"
    >
      <div className="col-span-2 my-2 mx-2">
        <InputComponent
          name="middle_name"
          register={register}
          label="Middle Name"
          placeholder="Enter your Middle Name"
          inputId="middle_name"
          labelId="middle_name_label"
          type="text"
          error={errors.middle_name?.message?.toString()}
          icon={<MdDriveFileRenameOutline className="size-4" />}
        />
        <InputComponent
          name="username"
          register={register}
          label="Username"
          placeholder="Enter your Username"
          inputId="username"
          labelId="username_label"
          type="text"
          error={errors.username?.message?.toString()}
          icon={<FiUserCheck className="size-4" />}
        />
        <InputComponent
          name="date_of_birth"
          register={register}
          label="Date of Birth"
          placeholder="Enter your Date of Birth"
          inputId="date_of_birth"
          labelId="date_of_birth_label"
          type="date"
          error={errors.date_of_birth?.message?.toString()}
        />

        <InputComponent
          name="nationality"
          register={register}
          label="Nationality"
          placeholder="Enter your Nationality"
          inputId="nationality"
          labelId="nationality_label"
          type="text"
          error={errors.nationality?.message?.toString()}
          icon={<PiGlobeSimpleXLight className="size-4" />}
        />
        <InputComponent
          name="phone_number"
          register={register}
          label="Phone Number"
          placeholder="Enter your Phone Number"
          inputId="phone_number"
          labelId="phone_number_label"
          type="text"
          error={errors.phone_number?.message?.toString()}
          icon={<MdOutlineAddIcCall className="size-4" />}
        />
        <InputComponent
          name="home_address"
          register={register}
          label="Home Address"
          placeholder="Enter your Home Address"
          inputId="home_address"
          labelId="home_address_label"
          type="text"
          error={errors.home_address?.message?.toString()}
          icon={<HomeIcon className="size-4" />}
        />
        <InputComponent
          name="Emergency_contact_information"
          register={register}
          label="Emergency Contact Information"
          placeholder="Enter Emergency Contact Information"
          inputId="Emergency_contact_information"
          labelId="Emergency_contact_information_label"
          type="text"
          error={errors.Emergency_contact_information?.message?.toString()}
          icon={<PiPhonePlusThin className="size-4" />}
        />

        <textarea
          {...register("student_support")}
          placeholder="Student Support Needs"
          className="block w-full max-w-xs px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        ></textarea>

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

        <DynamicButton
          className={clsx("px-1")}
          label={isButtonLoading ? "Saving..." : "Save"}
          icon={<BsFillSendCheckFill className="size-4 text-white" />}
          isLoading={isButtonLoading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default AddUser;

// .................................................
