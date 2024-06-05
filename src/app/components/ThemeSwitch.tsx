import React from "react";
import {Switch, VisuallyHidden, useSwitch} from "@nextui-org/react";
import { FaRegCircleDot } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";

const ThemeSwitch = (props: any) => {
  const {
    Component, 
    slots, 
    isSelected, 
    getBaseProps, 
    getInputProps, 
    getWrapperProps
  } = useSwitch(props);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
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
            {isSelected ? <FaRegCircleDot/> : <FaRegCircle/>}
          </div>
      </Component>
    </div>
  )
}


export default function App() {
  return <ThemeSwitch/>
}
