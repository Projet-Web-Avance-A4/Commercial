import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { FaTrashCan } from "react-icons/fa6";

const DeleteUserButton = (item: any) => {

  const itemId = item.id;

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/client/deleteClient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId})
      });
      if (response.ok) {
        console.error('User deleted');
      } else {
        console.error('Failed to delete user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <Tooltip className="text-black" content="Supprimer">
        <Button isIconOnly radius="full" size="sm" variant="light" onClick={handleDelete}>
          <FaTrashCan className="text-default-400 text-red" />
        </Button>
      </Tooltip>
  );
};

export default DeleteUserButton;
