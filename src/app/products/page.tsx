
import DefaultLayout from "@/components/layouts/DefaultLayout"
import { IoSearch } from "react-icons/io5"
import CardProduct from "@/components/fragemnts/cardProduct"
import { url } from "@/api/auth";
import { cookies } from "next/headers";

async function getData(): Promise<any[]> {
    const data = await fetch(`${url}/product/list`, {
        cache: "no-cache",
        headers: {
            'Authorization': cookies().get('token')?.value || ''
        }
    }).then((res) => res.json());
    return data.data;
}

export default async function Products() {
    const apiData = await getData();

    return (
        <DefaultLayout>
            <div className="w-full  mt-4 relative ">
                <input className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="Cari produk..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="mt-5"  >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-3" >
                    {apiData?.map((item: any) => (
                        <CardProduct key={item.id} name={item.name} image={item.images?.[0]} stock={item.total_stock}
                            size={item?.productType.map((item: any) => <p className="text-sm text-slate-500 mr-1" > {item.size} </p>)} />
                    ))}
                </div>
            </div>
        </DefaultLayout>

    )
}


