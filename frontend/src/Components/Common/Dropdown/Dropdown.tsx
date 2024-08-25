// src/components/SelectDropdown.js
import { useState } from "react";

const SelectDropdown = ({ options, onSelect, title }: any) => {
  const [selectedOption, setSelectedOption]: any = useState(null);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div>
      <select
        title={title}
        id="select-dropdown"
        value={selectedOption}
        onChange={(e: any) => handleOptionClick(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected value={""}>
          Select a {title}
        </option>
        {options?.map((el: any, index: number) => {
          return (
            <option key={index} value={el?.value}>
              {el?.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectDropdown;
