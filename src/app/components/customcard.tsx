import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { ReactNode } from "react";
import React from "react";

interface iCustomCard {
  title: string
  description?: string
  href: string
  btnText: string
  icon?: ReactNode
}

export default function CustomCard(props: iCustomCard) {

    return (
        <NextUIProvider>
            <Card className="m-8 h-46">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start h-30">
                <div>
                <h4 className="font-bold text-lg xl:text-3xl flex items-center gap-2 h-24">{props.icon}{props.title}</h4>
                <p className="text-default-500">{props.description}</p>
                </div>
              </CardHeader>
              <CardBody>
                <Button as={Link} href={props.href}>
                  <p>{props.btnText}</p>
                </Button>
              </CardBody>
            </Card>
        </NextUIProvider>
    );
}
