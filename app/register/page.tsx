"use client";
import {useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { users } from "@/types/users";
import React from "react";
import Link from "next/link";

const roles = ["ADMINISTRATOR", "TUTOR OR LECTURER", "STUDENT"];

const RegisterPage = () => {
  const [res, setRes] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [secretPin, setSecretPin] = useState("");
  const [userImage, setUserImage] = useState<File | null>(null);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    secretPin: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserImage(e.target.files[0]);
    }
  };

  const handleChange = (e: any) => {
    setSelectedRole(e.target.value);
    data.role = e.target.value;
  };

  const handleSecretPin = (e: any) => {
    setSecretPin(e.target.value);
    setData({ ...data, secretPin: e.target.value });
  };

  const router = useRouter();
  // let event: React.FormEvent<HTMLFormElement>;
  const onRegister = async (data: users) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role || "");
    formData.append("secretPin", data.secretPin || "");
    if (userImage) {
      formData.append("userImage", userImage);
    }

    try {
      const response = await axios.post("/api/auth/register", formData);
      setRes(response.data.message);
      console.log("RESPONSE::", response);
      router.push("/login");
      console.log("SUCC RESPONSE::", res);
    } catch (err) {
      setRes((err as any).response.data.message);
      console.log("ERR RESPONSE::", err);
      console.error((err as any).response.data.message);
    }
  };

  return (
    <div className="text-black flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onRegister({ ...data });
        }}
        className="p-6 bg-white rounded shadow-md"
      >
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <p className="text-center text-red-500">{res}</p>
        <input
          type="text"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="first name"
        />
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="last name"
        />
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="email"
        />
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="Password"
        />
        <select
          className="block w-full p-2 mb-4 border rounded"
          required
          onChange={handleChange}
          value={selectedRole}
        >
          <option value="">Select a role</option>
          {roles.map((role, id) => (
            <React.Fragment key={id}>
              <option value={role}>{role}</option>
            </React.Fragment>
          ))}
        </select>
        {selectedRole === "ADMINISTRATOR" && (
          <input
            type="password"
            value={secretPin}
            onChange={handleSecretPin}
            maxLength={6}
            className="block w-full p-2 mb-4 border rounded"
            placeholder="Enter your secret pin"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="block w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          {" "}
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
