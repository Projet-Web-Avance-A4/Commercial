import React from "react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { FaRegCircleDot, FaRegCircle } from "react-icons/fa6";
import { NextUIProvider, Tooltip } from "@nextui-org/react";
import { ThemeSwitchProps } from "../../interfaces/themeSwitch";

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ onChange }) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    onChange: (event) => {
      if (onChange) {
        onChange(event.target.checked);
      }
    },
  });

  const handleClick = () => {
    console.log("test button");
  };

  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Changer état">
        <div className="flex flex-col gap-2">
          <Component {...getBaseProps()} onClick={handleClick}>
            <VisuallyHidden>
              <input {...getInputProps()} />
            </VisuallyHidden>
            <div
              {...getWrapperProps()}
              className={slots.wrapper({
                class: [
                  "w-8 h-8",
                  "flex items-center justify-center",
                  "rounded-lg bg-black hover:bg-default-200",
                ],
              })}
            >
              {isSelected ? <FaRegCircleDot /> : <FaRegCircle />}
            </div>
          </Component>
        </div>
      </Tooltip>
    </NextUIProvider>
  );
};

export default function App() {
  return (
    <ThemeSwitch onChange={(selected) => console.log("Switch state:", selected)} />
  );
}
