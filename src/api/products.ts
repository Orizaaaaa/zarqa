import { axiosInterceptor } from "./axiosInterceptor"

export const createProduct = async (form: any, callback: any) => {
    axiosInterceptor.post('/product', form)
        .then((result) => {
            callback(true, result.data);
        }).catch((err) => {
            callback(false, err);
        });
}


