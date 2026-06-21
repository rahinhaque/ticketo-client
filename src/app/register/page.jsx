"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { uploadImage } from "@/utils/uploadImage";
import { redirect } from "next/navigation";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  //React Hook From for form state management---------------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log("Form Errors:", errors); // Log form errors for debugging


  // Handle form submission---------------------------------------------------------------------
const onSubmit = async (data) => {
  // 1. Declare the variable here so JavaScript knows it exists
  let isSuccess = false;

  try {
    toast.loading("Uploading image...");

    const imageUrl = await uploadImage(data.image[0]);

    toast.dismiss();
    toast.success("Image uploaded successfully");

    const { data: signUpData, error: signUpError } =
      await authClient.signUp.email({
        ...data,
        image: imageUrl,
      });

    if (signUpError) {
      toast.error(signUpError.message || "Registration failed");
      return;
    }

    toast.success("Account created successfully!");

    // 2. Change it to true since everything succeeded
    isSuccess = true;
  } catch (error) {
    console.error(error);
    toast.dismiss();
    toast.error(error.message || "Something went wrong");
  }

  // 3. This will now work perfectly without crashing
  if (isSuccess) {
    redirect("/");
  }
};



        // -========================================================---------------------------------------------
        // main code ---------------------------------------------------------------------------------------------------

  return (
    <div className="my-10 mx-auto px-4">
      <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <Logo />
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Join Ticketo to book premium events or host your own organization.
          </p>
        </CardHeader>
        <CardBody className="gap-4">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <Label htmlFor="name">Full Name</Label>
            {
              errors.name && (
                <p className="text-red-500 text-sm mb-1">{errors.name.message}</p>
              )
            }
            <Input
              {...register("name", { required: "Name is required" })}
              id="name"
              placeholder="John Doe"
              labelPlacement="outside"
              startContent={<FaUser className="text-slate-400 text-sm" />}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
            />
            <Label htmlFor="email">Email Address</Label>
            {
              errors.email && (
                <p className="text-red-500 text-sm mb-1">{errors.email.message}</p>
              )
            }
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              id="email"
              placeholder="john@example.com"
              type="email"
              labelPlacement="outside"
              startContent={<FaEnvelope className="text-slate-400 text-sm" />}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
            />
            <Label htmlFor="image">Profile Image URL</Label>
            {
              errors.image && (
                <p className="text-red-500 text-sm mb-1">{errors.image.message}</p>
              )
            }
            <Input
              {...register("image", {
                // pattern: {
                //   value: /^(http:\/\/|https:\/\/).+$/i,
                //   message: "Invalid image URL",
                // },
              })}
              type="file"
              accept="image/*"
              id="image"
              placeholder="https://example.com/avatar.jpg"
              labelPlacement="outside"
              startContent={<FaImage className="text-slate-400 text-sm" />}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
            />

            <Label htmlFor="password">Password</Label>
            {
              errors.password && (
                <p className="text-red-500 text-sm mb-1">{errors.password.message}</p>
              )
            }
            <Input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "Password must be at least 6 characters long and contain at least one letter and one number",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              labelPlacement="outside"
              startContent={<FaLock className="text-slate-400 text-sm" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none text-slate-400 hover:text-white cursor-pointer"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              }
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
            />

            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor="role"
                className="text-sm font-semibold text-slate-300"
              >
                Select Role
              </Label>
              {
                errors.role && (
                  <p className="text-red-500 text-sm mb-1">{errors.role.message}</p>
              )}
              <select
                {...register("role", { required: "Role is required" })}
                id="role"
                aria-label="Select Role"
                defaultValue=""
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm outline-none focus:border-pink-500"
              >
                <option value="attendee" className="bg-slate-950 text-white">
                  Attendee (Browse & Book Tickets)
                </option>

                <option value="organizer" className="bg-slate-950 text-white">
                  Organizer (Create & Host Events)
                </option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
              radius="lg"
            >
              Create Account
            </Button>
          </Form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-white/5" />
            <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
              Or Sign Up With
            </span>
            <div className="flex-grow border-t border-white/5" />
          </div>

          <Button
            variant="bordered"
            className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
            radius="lg"
            startContent={<FaGoogle className="text-pink-500" />}
          >
            Google OAuth
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
