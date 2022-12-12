import { AxiosInstance } from "axios";

const requestOtp = async (phone: string, axiosInstance: AxiosInstance) => {
    try {
        let res = await axiosInstance.post("/api/user/reqotp", { phone }, {
            headers: {
                "content-type": "application/json"
            }
        });
        return res.data;
    } catch (error: any) {
        console.error(error);
        if (error.response.status === 400) {
            console.log(error.response.data.msg[0]);
            throw new Error(error.response.data.msg[0]);
        }
        if (error.response.status === 500) {
            throw new Error(error.response.data.message);
        }
        else {
            throw new Error("Something went wrong");
        }
    }
};

const verifyOtp = async (phone: string, otp: number, axiosInstance: AxiosInstance) => {
    try {
        let res = await axiosInstance.post("/api/user/verifyotp", { phone, otp }, {
            headers: {
                "content-type": "application/json"
            }
        });
        return res.data;
    } catch (error: any) {
        console.error(error);
        if (error.response.status === 400) {
            console.log(error.response.data.msg[0]);
            throw new Error(error.response.data.msg[0]);
        }
        if (error.response.status === 500) {
            throw new Error(error.response.data.message);
        }
        else {
            throw new Error("Something went wrong");
        }
    }
};

const autoLogin = async (axiosInstance: AxiosInstance) => {
    try {
        let res = await axiosInstance.get("/api/user/autologin", {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        });
        return res.data;
    } catch (error: any) {
        if (error.response.status === 403) {
            throw new Error("Please Login Again");
        }
        if (error.response.status === 500) {
            throw new Error(error.response.data.message);
        }
        if (error.response.status === 400) {
            throw new Error(error.response.data.msg[0]);
        } else {
            throw new Error("Something went wrong");
        }
    }
}

export { requestOtp, verifyOtp, autoLogin };