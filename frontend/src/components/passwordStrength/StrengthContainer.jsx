const StrengthContainer = ({ color }) => {
  return (
    <div
      className={`w-full h-1 rounded-lg ${color || "bg-gray-300"}`}
    ></div>
  );
};

export default StrengthContainer;
