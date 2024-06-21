import { User } from "./user";

export interface iHeader {
    user?: User | null;
    title?: string;
    showMyAccount?: boolean;
    showStats?: boolean;
}

export interface HeaderContextProps {
    user: User | null;
    showMyAccount: boolean;
    showStats: boolean;
    showSponsor: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setShowMyAccount: React.Dispatch<React.SetStateAction<boolean>>;
    setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSponsor: React.Dispatch<React.SetStateAction<boolean>>;
}