import React from "react";
import {
  Button,
  NextUIProvider,
  Tooltip,
} from "@nextui-org/react";
import { FaTrashCan } from "react-icons/fa6";

function test() {
    console.log("test button")
}

export default function deleteUserButton() {
  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Supprimer">
        <Button isIconOnly radius="full" size="sm" variant="light" onClick={test}>
          <FaTrashCan className="text-default-400 text-red" />
        </Button>
      </Tooltip>
    </NextUIProvider> 
  );
};