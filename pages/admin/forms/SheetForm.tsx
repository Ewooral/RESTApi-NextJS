import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Link } from "lucide-react";
  import { FieldValues, useForm } from 'react-hook-form'
const SheetForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const watchedFields = watch([
    "firstName",
    "lastName",
    "email",
    "password",
    "role",
    "secretPin",
  ]);

  
    return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
      </SheetTrigger>
      {/* @ts-ignore */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Kindly update your credentials. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form  className="space-y-4">
          {Object.entries(watchedFields).map(([field, isChecked]) =>
            isChecked ? (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field}
                </label>
                <input
                  {...register(field)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ) : null
          )}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update User
          </button>
        </form>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    )
}