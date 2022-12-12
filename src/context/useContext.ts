import axios from "axios";
import { useState } from "react";
import { autoLogin } from "../api/login";

export const useContextData = () => {
    let [user, setUser] = useState<boolean>(false);
    let [userData, setUserData] = useState<string>("");
    let axiosInstance = axios.create({
        baseURL: "https://invenotory-backend.onrender.com",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const autoLoginHandler = async () => {
        try {
            let res = await autoLogin(axiosInstance);
            setUser(true);
            setUserData(res.user.phoneNumber);
        } catch (error: any) {
            console.log(error);
        }
    }

    return {
        user, setUser,
        userData, setUserData,
        axiosInstance,
        autoLoginHandler
    }
}