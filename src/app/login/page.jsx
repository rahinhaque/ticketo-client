"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const formContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const formItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  //React Hook From for form state management---------------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log("Form Errors:", errors); // Log form errors for debugging

  // Handle login form submission---------------------------------------------------------------------
 const onSubmit = async (data) => {

   let isSuccess = false;
   let toastId = null;

   try {

     toastId = toast.loading("Signing in...");

     const { data: signInData, error: signInError } =
       await authClient.signIn.email({
         ...data,
       });

     if (signInError) {

       toast.error(signInError.message || "Sign in failed", { id: toastId });
       return;
     }


     toast.success("Signin successfully!", { id: toastId });
     isSuccess = true;
   } catch (error) {
     console.error(error);

     if (toastId) toast.dismiss(toastId);
     toast.error(error.message || "Something went wrong");
   }


   if (isSuccess) {
     redirect("/");
   }
 };

  return (
    <div className="my-10 mx-auto px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <Card className="w-full border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
          <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 300 }}
            >
              <Logo />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.26, duration: 0.45 }}
              className="text-slate-400 text-sm mt-1"
            >
              Access your Ticketo account and purchase event tickets.
            </motion.p>
          </CardHeader>
          <CardBody className="gap-4">
            <motion.div variants={formContainer} initial="hidden" animate="show">
              <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                <motion.div variants={formItem}>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    {...register("email", { required: true })}
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    labelPlacement="outside"
                    startContent={<FaEnvelope className="text-slate-400 text-sm" />}
                    className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                  />
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </motion.div>

                <motion.div variants={formItem}>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password", { required: true })}
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
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </motion.div>

                <motion.div variants={formItem} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                    radius="lg"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </Form>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-white/5" />
                <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Login With</span>
                <div className="flex-grow border-t border-white/5" />
              </div>

              <motion.div variants={formItem} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="bordered"
                  className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
                  radius="lg"
                  startContent={<FaGoogle className="text-pink-500" />}
                >
                  Google Account
                </Button>
              </motion.div>

              <p className="text-center text-sm text-slate-400 mt-6">
                Don't have an account?{" "}
                <Link href="/register" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}

export default LoginPage
