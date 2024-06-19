import { ReactNode } from "react";

export interface iPortalCard {
    btnText: string;
    href: string;
    port: string;
}

export interface iCustomCard {
    title: string;
    description?: string;
    href?: string;
    btnText?: string;
    icon?: ReactNode
}

export interface ComponentListProps {
    components: string[];
}