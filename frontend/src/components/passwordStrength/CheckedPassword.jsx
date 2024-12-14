import { Check, X } from "lucide-react";

const CheckedPassword = ({ lable, checked }) => {
  return (
    <div className="flex items-center text-gray-400">
      {checked ? (
        <Check className={`size-5 text-green-400`} />
      ) : (
        <X className="size-5 text-red-500" />
      )}
      <p className="ml-3">{lable}</p>
    </div>
  );
};

export default CheckedPassword;
