import { AxiosInstance } from "axios";
import { createContext } from "react";

interface GlobalContextValue {
    user: boolean;
    setUser: (user: boolean) => void;
    userData: string;
    setUserData: (userData: string) => void;
    axiosInstance: AxiosInstance;
    autoLoginHandler: () => void;
}
const GlobalContext = createContext<GlobalContextValue>({
    user: false,
    setUser: () => { },
    userData: "",
    setUserData: () => { },
    axiosInstance: {} as AxiosInstance,
    autoLoginHandler: () => { }
});


export default GlobalContext;