import React from "react";
import { motion } from "framer-motion";
import CustomButton from "../components/CustomButton";
import PinInput from "react-pin-input";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/route.constants";

const VerificationEmail = () => {
  const { isLoading, error, verifyEmail } = useAuthStore();
  const navigate = useNavigate();

  const handleVerifyEmail = async (token) => {
    try {
      await verifyEmail(token);
      if (!error) {
        navigate(ROUTES.home, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          Verify Your Email
        </h2>
        <p className="text-gray-400">
          Enter the 4-digit code sent to your email address
        </p>
        <PinInput
          length={5}
          initialValue=""
          secret
          secretDelay={300}
          type="numeric"
          inputMode="number"
          style={{ padding: "20px" }}
          inputStyle={{
            borderColor: "#8EA3A6",
            borderRadius: 10,
            margin: 4,
            background: "#387478",
            color: "white",
            fontSize: 30,
          }}
          inputFocusStyle={{ borderColor: "#00FF9C" }}
          onComplete={(value, _) => {
            handleVerifyEmail(value);
          }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        {error && <p className="text-red-500">{error}</p>}
        <CustomButton type="submit" text="Verify" loading={isLoading} />
      </div>
    </motion.div>
  );
};

export default VerificationEmail;
