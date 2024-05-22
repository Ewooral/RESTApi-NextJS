import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

interface CustomToast {
  showSuccessToast: (message: string, title: string) => void;
  showErrorToast: (error: string, title: string) => void;
}

export const useCustomToast = (): CustomToast => {
  const { toast } = useToast();

  const showSuccessToast = (title: string, message: string) => {
    toast({
      variant: "default",
      title: title,
      description: JSON.stringify(message),
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      className: "green-toast",
    });
  };

  const showErrorToast = (title: string, error: string) => {
    toast({
      variant: "destructive",
      title: title,
      description: JSON.stringify(error),
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    });
  };

  return {showSuccessToast, showErrorToast} as CustomToast;
};