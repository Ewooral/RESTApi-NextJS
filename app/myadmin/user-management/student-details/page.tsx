"use client";
import React, { useRef, useState } from "react";
import userStore from "@/store";
import { FaRegEdit } from "react-icons/fa";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCustomToast } from "@/hooks/useToast";
import { format } from "date-fns";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";
import { personalInfoSchema } from "@/lib/schemas";
import UserDetailsFromSession from "@/app/(user-details-sections)/personal-info/DetailsFromSession";
import DynamicButton from "@/components/CustomButton";
import { usePersonalForm } from "@/hooks/usePersonalInfoForm";
import PersonalInfoForm from "@/app/(user-details-sections)/personal-info/PersonalInfoForm";
import { FieldValues } from "react-hook-form";
import EducationalInfoForm from "@/app/(user-details-sections)/educational-info/EducationalInfo";
import CustomEwooralTabComponent from "@/components/tabs/CustomEwooralTab";
import PersonalInfo from "@/app/(user-details-sections)/personal-info/PersonalInfoTab";
import EducationalInfo from "@/app/(user-details-sections)/educational-info/EducationalInfoTab";
import DocumentTab from "@/app/(user-details-sections)/document-upload/DocumentTab";
import { Tab } from "@/types/TabComponentProps";
import UploadUserProfileImage from "@/components/uploads/images/UploadUserProfileImage";


type Data = {
  message: string;
  imageUrl: string;
  imageId: string;
};

const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const path = new URL(src).pathname;
  const cleanPath = path.replace("/dn1lqngds/image/upload/", "");
  return `https://res.cloudinary.com/dn1lqngds/image/upload/w_${width},q_${
    quality || 75
  }/${cleanPath}`;
};

const StudentDetails: React.FC = ({}) => {
  const { session, setImageId, setImageUrl, setSession } = userStore();
  const [animateFaRegEdit, setAnimateFaRegEdit] = useState(false);
  const [isPersonalInfoButtonLoading, setIsPersonalInfoButtonLoading] =
    useState(false);
  const [isUploadButtonLoading, setIsUploadButtonLoading] = useState(false);
  const [isEducationalinfoButtonLoading, setIsEducationalinfoButtonLoading] =
    useState(false);
  const [isEditButtonLoading, setIsEditButtonLoading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { showAfterMedium, hideAfterMedium, hideAfterLargerScreens } =
    useCssMediaQueries();

  const formattedExpiryTime = format(
    session.expiryTime,
    "MMMM dd, yyyy HH:mm:ss"
  );

  const fetchImage = async (email: string) => {
    try {
      const res = await axios.get(
        `/api/v1/uploads/get-uploaded-image?email=${email}`
      );
      setImageUrl(res.data.imageUrl);
      setImageId(res.data.imageId);
      setSession({
        ...session,
        imageUrl: res.data.imageUrl,
        imageId: res.data.imageId,
      });
      // console.log("Data:: ", res.data);
      // console.log("Image URL:: ", res.data.imageUrl);
      // console.log("Image ID:: ", res.data.imageId);

      return res.data as Data;
    } catch (error) {
      throw new Error("Fetching failed miserably");
    }
  };

  const queryClient = useQueryClient();
  const { data, refetch, isError, error } = useQuery({
    queryKey: ["uploadedImage"],
    queryFn: () =>
      session.email ? fetchImage(session.email) : Promise.reject("No imageId"),
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("userImage", file);
        setIsUploadButtonLoading(true);
        const response = await axios.post(
          "/api/v1/uploads/upload-image-to-cloudinary",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        showSuccessToast("Image uploaded successfully", data?.message ?? "");
        setIsUploadButtonLoading(false);
        // console.log("Ress::: ", response.data);

        return response.data;
      } catch (error) {
        throw new Error("Failed to upload Image");
      } finally {
        setIsUploadButtonLoading(false);
      }
    },
    onSuccess: (data) => {
      //@ts-ignore
      queryClient.invalidateQueries("uploadedImage");
    },

    onError(error, variables, context) {
      showErrorToast("Error uploading image", error.toString());
      console.error("Error uploading image:", error);
    },
  });

  const handleAnimateFaRegEdit = () => {
    setAnimateFaRegEdit(true);
    setIsFileSelected(true);
    fileInputRef.current?.click();
    setTimeout(() => {
      setAnimateFaRegEdit(false);
    }, 500);
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUploadImage = async () => {
    if (file) {
      try {
        await uploadImageMutation.mutateAsync(file);
        setFile(null);
        setIsFileSelected(false);
      } catch (err) {
        showErrorToast("Error uploading image", err as string);
        console.error("Error uploading image:", err);
      }
    }
  };

  if (isError) {
    console.error(error);
  }

  // PERSONAL INFO FORM SUBMISSION
  const onSubmitPersonalForm = async (data: FieldValues) => {
    // (event as unknown as React.FormEvent<HTMLFormElement>).preventDefault();
    // trigger();
    console.log("logging...");
    setIsPersonalInfoButtonLoading(true);
    const parsePersonalInfodData = personalInfoSchema.safeParse(data);

    if (parsePersonalInfodData.success) {
      console.log("Data:: ", parsePersonalInfodData);
      setIsPersonalInfoButtonLoading(false);
    } else {
      console.log(parsePersonalInfodData.error);
    }
  };

  // EDUCATIONAL INFO FORM SUBMISSION
  const onSubmitEducationalForm = async (data: FieldValues) => {
    // (event as unknown as React.FormEvent<HTMLFormElement>).preventDefault();
    console.log("logging...");

    setIsEducationalinfoButtonLoading(true);
    const parsePersonalInfodData = personalInfoSchema.safeParse(data);

    if (parsePersonalInfodData.success) {
      console.log("Data:: ", parsePersonalInfodData);
      setIsEducationalinfoButtonLoading(true);
    } else {
      console.log(parsePersonalInfodData.error);
    }
  };

  // CUSTOM EWOORAL TAB DATA
  const tabs: Tab[] = [
    { id: "personalInfo", title: "Personal Info", content: <PersonalInfo /> },
    {
      id: "educationalInfo",
      title: "Educational Info",
      content: <EducationalInfo />,
    },
    { id: "document", title: "Document", content: <DocumentTab /> },
  ];
  return (
    <>
      <section className="grid grid-cols-5 justify-center items-start w-full gap-4">
        {/* FIRST COLUMN */}
        <div
          className={clsx(
            "col-span-1 bg-[white]",
            hideAfterLargerScreens && "col-span-5"
          )}
        >
          <div className="w-full">
            <h1 className="font-extrabold text-lg p-2 text-[#3b82f6]">
              Student Details Page
            </h1>
          </div>

          <UploadUserProfileImage
            hideAfterLargerScreens={hideAfterLargerScreens}
            data={data ?? null}
            cloudinaryLoader={cloudinaryLoader}
            handleAnimateFaRegEdit={handleAnimateFaRegEdit}
            animateFaRegEdit={animateFaRegEdit}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            file={file}
            isFileSelected={isFileSelected}
            handleUploadImage={handleUploadImage}
            isUploadButtonLoading={isUploadButtonLoading}
          />

          <UserDetailsFromSession
            session={{
              lastname: session.lastname,
              userId: session.userId,
              role: session.role,
              status: session.status,
              firstname: session.firstname,
              email: session.email,
            }}
            formattedExpiryTime={formattedExpiryTime}
          />
          {/* EDIT BUTTON */}
          <DynamicButton
            label={isEditButtonLoading ? "Editing..." : "Edit Details"}
            icon={<FaRegEdit className="text-[#fff] size-4" />}
            className="flex justify-start px-3 py-2"
            type="submit"
          />
        </div>

        {/* SECOND COLUMN */}
        {/* TAKES 3/5TH OF THE PARENT GRID WITH A CHILD GRID OF COLS 10 DEFINED IN IT */}
        <div
          className={clsx(
            "col-span-3 bg-[white] gap-4",
            hideAfterLargerScreens && "col-span-5",
            "grid grid-cols-10 "
          )}
        >
          {/* TAKES FULL COL SPAN 10/10 */}
          <div className="border-b-2 w-full col-span-10">
            <h1 className="font-extrabold text-lg p-2 bg-white text-[#3b82f6]">
              Complete User Profile
            </h1>
          </div>

          {/* TAKES 10/10 */}
          <div className="col-span-10 gap-4">
            <div className="px-2">
              <PersonalInfoForm />
            </div>
          </div>

          {/* TAKES 5/10 WITH ANOTHER GRID OF 4/4 DEFINED IN IT */}
          {/* <div className="col-span-5">
            <EducationalInfoForm />
          </div> */}

          {/* TAKES FULL COL SPAN 10/10 */}
          <div className="border-b-2 w-full col-span-10">
            <h3 className="font-extrabold  col-span-4 text-xs bg-white text-[#a58c2a]">
              work Experience
            </h3>
            <div className="grid grid-cols-4 my-2 text-xs">
              <div className="col-span-2 my-2 mx-2">Hey people</div>

              <div className="col-span-2 my-2 mx-2">Hey people</div>
            </div>
          </div>
        </div>

        {/* THIRD COLUMN.................................................................. */}
        <div
          className={clsx(
            "col-span-1 bg-[white]",
            hideAfterLargerScreens && "col-span-5"
          )}
        >
          {/* TAKES 10/10 */}
          <div className="col-span-5">
            <div className="border-b-2 w-full">
              <h1 className="font-extrabold text-lg border-b-2 p-2 bg-white text-[#3b82f6]">
                View Details
              </h1>

              <div className="p-4">
                <CustomEwooralTabComponent tabs={tabs} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentDetails;
