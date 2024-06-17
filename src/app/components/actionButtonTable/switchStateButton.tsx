import React from "react";
import { useSwitch, VisuallyHidden } from "@nextui-org/react";
import { FaRegCircleDot, FaRegCircle } from "react-icons/fa6";
import { NextUIProvider, Tooltip } from "@nextui-org/react";
import { ThemeSwitchProps } from "../../interfaces/themeSwitch";

const switchUserState = (item: any) => {

  const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ onChange }) => {

    const {
      Component,
      slots,
      isSelected,
      getBaseProps,
      getInputProps,
      getWrapperProps,
    } = useSwitch({
      defaultSelected: item.status === "Active", // Initialise isSelected en fonction de item.status
      onChange: (event) => {
        if (onChange) {
          onChange(event.target.checked);
        }
      },
    });

    const handleChangeStatus = async () => {
      try {
        const itemId = item.id;
        const itemStatus = item.status;

        const response = await fetch(`http://localhost:4000/client/updateStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: itemId, status: itemStatus }),
        });

        if (!response.ok) {
          throw new Error('Failed to update status');
        }

        window.location.reload();

      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    return (
      <NextUIProvider>
        <Tooltip className="text-black" content="Changer état">
          <div className="flex flex-col gap-2">
            <Component {...getBaseProps()} onClick={handleChangeStatus}>
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

  return (
    <ThemeSwitch 
      onChange={(selected) => console.log("Switch state:", selected)}
    />
  );
};

export default switchUserState;
