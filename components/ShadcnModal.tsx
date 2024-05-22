import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import userStore from "@/store";

const schema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  title: z.string().min(1, { message: "Title is required" }),
  terms: z.boolean().refine((v) => v === true, { message: "Agree to terms" }),
  isStudent: z.boolean().optional()
});

export type ShadcnProps = {
    open: boolean
    setOpen: (value:boolean) => void
}

export function ShadcnModal({open, setOpen}: ShadcnProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handleClose = () => {
    setOpen(false)
  };


  const onSubmit = (data: any) => {
    console.log(data);
    // handle form submission here
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Label>
                Name
                <Input {...register("firstname")} />
                {errors.firstname && <p>{errors.firstname.message?.toString()}</p>}
            </Label>
            <Label>
                Username
                <Input {...register("lastname")} />
                {errors.lastname && <p>{errors.lastname.message?.toString()}</p>}
            </Label>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}