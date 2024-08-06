import axios from "axios";
export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export const url = process.env.NEXT_PUBLIC_BASE_API

export const loginService = async (form: any, callback: any) => {
    await axios.post(`${url}/user/login`, form)
        .then((res) => {
            callback(true, res.data);
        }).catch((err) => {
            callback(false, err)
        })
}

