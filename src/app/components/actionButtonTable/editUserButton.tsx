import React from "react";
import {
  Button,
  NextUIProvider,
  Tooltip,
} from "@nextui-org/react";
import { FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function editUserButton(item: any) {


  const goToAccountPage = () => {
    console.log(item)
    const accountUrl = `/account/edit?id=${item.id}`;
    window.location.href = accountUrl;
  };

  return (
    <NextUIProvider>
      <Tooltip className="text-black" content="Editer">
        <Button isIconOnly radius="full" size="sm" variant="light" onClick={goToAccountPage} >
          <FaPenToSquare className="text-default-400 fill-amber-500" />
        </Button>
      </Tooltip>
    </NextUIProvider> 
  );
};