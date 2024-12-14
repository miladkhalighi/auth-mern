import React, { useEffect } from "react";
import { motion } from "framer-motion";
import InputField from "../components/InputField";
import { Lock, Mail, User } from "lucide-react";
import CustomButton from "../components/CustomButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordStrength from "../components/passwordStrength/PasswordStrength";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../constants/route.constants";

const SignUp = () => {
  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await signup(name, email, password);
      if (!error) {
        navigate(ROUTES.verificationEmail, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const password = watch("password");

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.5 }}
      className="z-10 max-h-md max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8 flex flex-col items-center justify-center">
        <h2 className="mb-5 text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account{" "}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputField
            {...register("name")}
            type="text"
            placeholder="Full name"
            icon={User}
            error={errors.name?.message}
          />
          <InputField
            {...register("email")}
            type="email"
            placeholder="Email Address"
            icon={Mail}
            error={errors.email?.message}
          />
          <InputField
            {...register("password")}
            type="password"
            placeholder="Password"
            icon={Lock}
            error={errors.password?.message}
            autoComplete="true"
          />
          <InputField
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            icon={Lock}
            error={errors.confirmPassword?.message}
            autoComplete="true"
          />
          {error && <p className="text-red-500">{error}</p>}
          <PasswordStrength password={password} />
          <CustomButton type="submit" text="Sign up" loading={isLoading} />
        </form>
      </div>
      <div className="text-center text-gray-400 bg-green-950 w-full p-4 bg-opacity-50 backdrop-blur-lg">
        <p>
          Already have an account?{" "}
          <span className="text-green-500 hover:underline cursor-pointer">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
