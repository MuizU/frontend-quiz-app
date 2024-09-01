import react, { ChangeEventHandler } from "react";

type TToggle = {
  value: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
const Toggle = ({ value, onChange }: TToggle) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-10 h-6 flex items-center px-[3px] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:justify-end peer-checked:bg-blue-600 bg-primary transition-all duration-300">
        <div className="h-[18px] w-[18px] bg-white rounded-full shadow-md transform transition-transform duration-300"></div>
      </div>
    </label>
  );
};
export default Toggle;
