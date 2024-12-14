import React from "react";

const InputField = React.forwardRef(({ icon: Icon, error, ...props }, ref) => {
  return (
    <div className="flex flex-col mb-3">
      <div className="relative">
        <div className="px-2 absolute inset-y-0 flex items-center pointer-events-none">
          <Icon className="text-green-500 size-5" />
        </div>
        <input
          ref={ref}
          {...props}
          className="cursor-pointer pl-10 w-full py-2 rounded-lg bg-gray-800
         hover:bg-gray-700 hover:bg-opacity-50 bg-opacity-50 border border-gray-600 focus:outline-green-600 focus:ring-2 focus:ring-green-500 text-white transition-all duration-200"
        />
      </div>
      {error && <p className="mt-1 text-yellow-100">{error}</p>}
    </div>
  );
});

InputField.displayName = "InputField"; // To avoid a warning about "displayName"

export default InputField;
