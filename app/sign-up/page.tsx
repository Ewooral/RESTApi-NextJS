// import React from "react";
// import { useForm, FieldValues  } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";


// type FormValues = z.infer<typeof userSchema>;

// // Define a schema for the form data
// const userSchema = z.object({
//   firstname: z.string().min(3, "First name is required"),
//   lastname: z.string().min(3, "Last name is required"),
//   email: z.string().email({ message: "Email must be a valid email" }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters" }),
// });

// function RegisterForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(userSchema),
//   });

//   const onSubmit = async (data: FieldValues) => {
//     try {
//       const response = await axios.post("/api/auth/postgres/sign-up", data);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//     <div className="flex flex-col">
//       <label className="font-bold mb-2">First Name:</label>
//       <input {...register("firstname")} className="border p-2 rounded" />
//       {errors.firstname && (
//         <p className="text-red-500">{(errors.firstname?.message || "") as string}</p>
//       )}
//     </div>
//     <div className="flex flex-col">
//       <label className="font-bold mb-2">Last Name:</label>
//       <input {...register("lastname")} className="border p-2 rounded" />
//       {errors.lastname && (
//         <p className="text-red-500">{(errors.lastname?.message || "") as string}</p>
//       )}
//     </div>
//     <div className="flex flex-col">
//       <label className="font-bold mb-2">Email:</label>
//       <input {...register("email")} className="border p-2 rounded" />
//       {errors.email && (
//         <p className="text-red-500">{(errors.email?.message || "") as string}</p>
//       )}
//     </div>
//     <div className="flex flex-col">
//       <label className="font-bold mb-2">Password:</label>
//       <input type="password" {...register("password")} className="border p-2 rounded" />
//       {errors.password && (
//         <p className="text-red-500">{(errors.password?.message || "") as string}</p>
//       )}
//     </div>
//     <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
//   </form>
//   );
// }

// export default RegisterForm;
'use client'
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/postgres/sign-up', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="font-bold mb-2">
          First Name:
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="border p-2 rounded" />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="font-bold mb-2">
          Last Name:
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="border p-2 rounded" />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="font-bold mb-2">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
        </label>
      </div>
      <div className="flex flex-col">
        <label className="font-bold mb-2">
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border p-2 rounded" />
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
}

export default RegisterForm;
