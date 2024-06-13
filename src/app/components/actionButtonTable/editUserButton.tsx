import React from "react";
import {
  Button,
  NextUIProvider,
  Tooltip,
} from "@nextui-org/react";
import { FaPenToSquare } from "react-icons/fa6";

function test() {
    console.log("test button")
}

export default function deleteUserButton() {
  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Editer">
        <Button isIconOnly radius="full" size="sm" variant="light" onClick={test}>
          <FaPenToSquare className="text-default-400 fill-amber-500" />
        </Button>
      </Tooltip>
    </NextUIProvider> 
  );
};