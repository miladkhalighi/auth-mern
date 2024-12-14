import React, { useEffect } from "react";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { Lock, Mail } from "lucide-react";
import CustomButton from "../components/CustomButton";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../constants/route.constants";

const Login = () => {
  const navigate = useNavigate();
  const { login, user, isLoading, error } = useAuthStore();
  const validationForm = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("enter valid email address"),
    password: yup.string().required("password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationForm) });

  const onSubmit = async (data) => {
    await login(data.email, data.password);
  };

  useEffect(() => {
    if (user) {
      navigate(user.verified ? ROUTES.home : ROUTES.verificationEmail);
    }
  }, [user, navigate]);

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
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          {error && <h2 className="text-red-400 my-6">{error}</h2>}
          <CustomButton type="submit" text="Login" loading={isLoading} />
        </form>
      </div>
      <div className="text-center text-gray-400 bg-green-950 w-full p-4 bg-opacity-50 backdrop-blur-lg">
        <p>
          Dont have an account?{" "}
          <span className="text-green-500 hover:underline cursor-pointer">
            <Link to={ROUTES.signup}>Sign up</Link>
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
