import { Toast } from "@/components";
import { getCookie } from "@/utils";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

// 服务器地址
// @ts-ignore
const baseUrl = import.meta.env.VITE_BASE_URL;

//请求携带的参数
const baseParams: AxiosRequestConfig = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: "",
    },
};

const ajax = async <T = any>(
    url: string,
    params: Omit<AxiosRequestConfig, "url"> = {}
): Promise<T> => {
    if (baseParams.headers!.token === "") {
        baseParams.headers!.token = getCookie() || "";
    }

    const response = await axios({
        url: baseUrl + url,
        ...baseParams,
        ...params,
    }).catch((err) => {
        Toast.show("请求失败");
        return null;
    });
    if (response) {
        return response.data;
    }
    return Promise.reject(null);
};

export default ajax;
