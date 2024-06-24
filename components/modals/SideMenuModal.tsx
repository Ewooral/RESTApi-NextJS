import { LoginForm } from "@/app/(auth)/sign-in/LoginForm";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SideMenuModal({label, icon}: {label?: string; icon?: React.ReactNode}) {

  function onSubmit(){
    console.log("It works");
    
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
/**
 * export function SideMenuModal({
  label,
  icon,
  isActive,
}: {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={clsx(
            "flex",
            "items-center",
            "cursor-pointer",
            "py-2",
            "px-4",
            "rounded-[31px]",
            "w-full",
            isActive && "bg-blue-500 text-white rounded-r-[31px] w-full",
            "hover:text-white",
            "transition-all",
            "duration-200",
            "ease-in-out"
          )}
        >
          {icon}
          <span className="ml-2">{label}</span>
        </div>
      </DialogTrigger>
 */