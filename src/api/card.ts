import { AxiosInstance } from "axios";

const getAllProducts = async (axiosInstance: AxiosInstance) => {
    try {
        let res = await axiosInstance.get("/api/product/all");
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

const deleteProduct = async (id: string, axiosInstance: AxiosInstance) => {
    try {
        let res = await axiosInstance.delete(`/api/product/delete/${id}`,{
            headers: {
                "x-auth-token": localStorage.getItem("token")
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


const addProduct = async (product: any, axiosInstance: AxiosInstance) => {
    try {
        let res = await axiosInstance.post("/api/product/create", product, {
            headers: {
                "x-auth-token": localStorage.getItem("token")
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


export  {getAllProducts,deleteProduct,addProduct};