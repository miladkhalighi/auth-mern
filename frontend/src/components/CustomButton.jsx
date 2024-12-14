import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const CustomButton = ({loading, text, ...props }) => {
  return (
    <motion.button
    className="flex justify-center
    text-white font-bold mt-10 w-full p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600
     shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none transition duration-200 "
      {...props}
      whileTap={{ scale: 0.95 }} 
      disabled= {loading}
    >
      {loading ? <Loader className="animate-spin"/> : text}
    </motion.button>
  );
};

export default CustomButton;
