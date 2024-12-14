import CheckedPassword from "./CheckedPassword";
import StrengthContainer from "./StrengthContainer";
const PasswordStrength = ({ password = "" }) => {
  const criterias = [
    { lable: "Contains 8 characters", checked: /.{8,}/.test(password) },
    { lable: "Contains one uppercase letter", checked: /[A-Z]/.test(password) },
    { lable: "Contains one lowercase letter", checked: /[a-z]/.test(password) },
    { lable: "Contains a number", checked: /[0-9]/.test(password) },
    {
      lable: "at least one special character",
      checked: /[@$!%*?&#]/.test(password),
    },
  ];

  const checkedCount = () =>
    criterias.reduce((count, e) => count + (e.checked ? 1 : 0), 0);

  const getStrengthText = (strength) => {
    if (strength === 1) return "Very Weak";
    else if (strength === 2) return "Weak";
    else if (strength === 3) return "Fair";
    else if (strength === 4) return "Good";
    else return "Strong";
  };

  const getColor = (strength) => {
    if (strength === 1) return "bg-red-600";
    else if (strength <= 2) return "bg-red-500";
    else if (strength === 3) return "bg-yellow-400";
    else if (strength === 4) return "bg-green-400";
    else return "bg-green-500";
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between text-gray-400 mb-1">
        <p>Password Strength</p>
        <p>{getStrengthText(checkedCount())}</p>
      </div>
      <div className="flex gap-2 mb-5">
        {criterias.map((item, index) => (
          <StrengthContainer
            color={index < checkedCount() ? getColor(checkedCount()) : null}
            key={item.lable}
          ></StrengthContainer>
        ))}
      </div>
      {criterias.map((item, index) => (
        <CheckedPassword
          key={index}
          lable={item.lable}
          checked={item.checked}
        />
      ))}
    </div>
  );
};

export default PasswordStrength;
