import axios from "axios";
export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
export const url = process.env.NEXT_PUBLIC_BASE_API
export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
export const cloudApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
export const cloudApiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET

export const loginService = async (form: any, callback: any) => {
    await axios.post(`${url}/users/login`, form)
        .then((res) => {
            callback(true, res.data);
        }).catch((err) => {
            callback(false, err)
        })
}

