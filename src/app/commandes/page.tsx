"use client";

import CustomTable from "../components/table";
import { Card, CardBody, CardHeader, NextUIProvider, getKeyValue } from "@nextui-org/react";
import Header from "../components/header";
import { FaBoxesStacked } from "react-icons/fa6";


const mockupRows = [
    {
        key: "1",
        name: "Tony Reichert",
        role: "CEO",
        status: "Active",
    },
    {
        key: "2",
        name: "Zoey Lang",
        role: "Technical Lead",
        status: "Paused",
    },
    {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: "Active",
    },
    {
        key: "4",
        name: "William Howard",
        role: "Community Manager",
        status: "Vacation",
    },
];

const columns = [
    {
        key: "name",
        label: "NAME",
    },
    {
        key: "role",
        label: "ROLE",
    },
    {
        key: "status",
        label: "STATUS",
    },
];

export default function Commandes() {
    return (
        <NextUIProvider className="h-screen bg-beige">
            <Header title="Restaurateur - Commandes" showMyAccount={true} showSponsor={true} showStats={true} />
            <div className="container mx-auto">
                <Card className="m-8">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="flex items-center font-bold text-large gap-2"><FaBoxesStacked/>Commandes</h4>
                    </CardHeader>
                    <CardBody>
                        <CustomTable/>
                    </CardBody>
                </Card>
            </div>
        </NextUIProvider>
    );
}