'use client';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Link from "next/link";
import React from 'react';
import DeleteUserModal from "../deleteUserModal/deleteUserModal";
import Image from 'next/image';
import ceseat from "../../../../public/images/logo-ceseat.png";
import { iHeader } from "@/app/interfaces/header";
import { useModal } from './utils';
import SponsorModal from "../sponsor/sponsor";
import { useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "@/app/interfaces/user";

export default function Header(props: iHeader) {

    const {  isDeleteModalOpen,
        isSponsorModalOpen,
        openDeleteModal,
        closeDeleteModal,
        openSponsorModal,
        closeSponsorModal } = useModal();

        const [user, setUser] = useState<User | null>(null);

        useEffect(() => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const decodedToken = jwt.decode(accessToken);
                if (decodedToken && typeof decodedToken !== 'string') {
                    const data: JwtPayload = decodedToken;
                    const userData: User = {
                        name: data.name ?? '',
                        surname: data.surname ?? '',
                        street: data.street ?? '',
                        city: data.city ?? '',
                        postal_code: data.postal_code ?? '',
                        phone: data.phone ?? '',
                        mail: data.mail ?? '',
                        role: data.role ?? '',
                        code_referral: data.code_referral ?? '',
                    };
                    setUser(userData);
                }
            }
        }, []);


    return (
        <Navbar className="bg-red">
            <NavbarBrand>
                <Link href={"/main"}><p className="font-bold text-inherit ml-2 text-large flex items-center gap-2">
                    <Image
                        src={ceseat}
                        width={50}
                        height={50}
                        alt="Logo Ceseat"
                    />
                     <span className="hidden md:block">CES&apos;Eat</span></p>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <p>{props.user?.role || props.title}</p>
            </NavbarContent>
            <NavbarContent justify="end">
                {props.showStats && props.user?.role == 'Restaurateur' &&
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Statistiques</Link>
                    </NavbarItem>
                }
                <NavbarItem>
                    {props.showMyAccount &&
                        <Dropdown className="text-black">
                            <DropdownTrigger>
                                <Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    Mon compte
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Account dropdown menu with description">
                                <DropdownSection title="Actions" showDivider>
                                    <DropdownItem
                                        key="consult"
                                        description="Mes informations"
                                        href="/account"
                                    >
                                        Mon compte
                                    </DropdownItem>
                                    <DropdownItem
                                         key="sponsor"
                                         onClick={openSponsorModal}
                                         className="cursor-pointer text-blue-500 mr-2"
                                    >
                                        Parrainage
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection title="Danger">
                                    <DropdownItem
                                        key="delete"
                                        className="text-danger"
                                        color="danger"
                                        description="Supprimer définitivement mon compte"
                                        onClick={() => openDeleteModal()}
                                    >
                                        Effacer mon compte 
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    }
                </NavbarItem>
            </NavbarContent>
            <DeleteUserModal userMail={props.user?.mail} isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} />
            <SponsorModal isOpen={isSponsorModalOpen} closeModal={closeSponsorModal} code={user?.code_referral}/>
        </Navbar>
    );
}
