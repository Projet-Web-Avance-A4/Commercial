"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Header from "../components/header";
import CustomCard from "../components/customcard";
import { Button } from "@nextui-org/button";

export default function AccountInfo() {
    return (
        <NextUIProvider className="h-screen bg-beige">
            <Header title="Restaurateur" showMyAccount={true} showStats={true} showSponsor={true} />
            <div className="container flex justify-center mx-auto">
                <Card className="m-8 flex-grow max-w-3xl">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <div className="flex grid-cols-2">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-3 mt-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <div className="grid row-span-2">
                                <h4 className="font-bold text-large">Bienvenue !</h4>
                                <p className="text-default-500">Mes informations...</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-flow-row-dense auto-cols-max grid-cols-2 gap-5 p-3">
                            <div>
                                <div className="font-bold">
                                    Nom :
                                </div>
                                <div className="grow border-solid border-1 shadow rounded text-default-500 mx-1 px-2">
                                    JE MAPPELLE NOM
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">
                                    Prénom :
                                </div>
                                <div className="border-solid border-1 shadow rounded text-default-500 mx-1 px-2">
                                    JE MAPPELLE PRENOM
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">
                                    Adresse :
                                </div>
                                <div className="border-solid border-1 shadow rounded text-default-500 mx-1 px-2">
                                    JE VIS ICI
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">
                                    Téléphone :
                                </div>
                                <div className="border-solid border-1 shadow rounded text-default-500 mx-1 px-2">
                                    APPELEZ MOI AU
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="font-bold">
                                    Adresse e-mail :
                                </div>
                                <div className="border-solid border-1 shadow rounded text-default-500 mx-1 px-2">
                                    MON ADRESSE MAIL
                                </div>
                            </div>
                        </div>

                        <Button className="bg-beige shadow w-32">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            <p className="font-semibold r-0">Modifier</p>
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </NextUIProvider>
    );
}
