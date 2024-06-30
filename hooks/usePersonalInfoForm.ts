// usePersonalForm.ts
import { useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalInfoSchema } from '@/lib/schemas';


// TypeScript type for the form data
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Custom hook to encapsulate useForm logic
export function usePersonalForm() {
  const formMethods = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
  });

  return {...formMethods}; // This includes register, handleSubmit, formState, etc.
}