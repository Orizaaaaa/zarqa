import DefaultLayout from "@/components/layouts/DefaultLayout"
import { IoSearch } from "react-icons/io5"
import CardProduct from "@/components/fragemnts/cardProduct"

const Products = () => {
    return (
        <DefaultLayout>
            <div className="w-full  mt-4 relative ">
                <input className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="Cari produk..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="mt-5"  >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-3" >
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                    <CardProduct />
                </div>
            </div>
        </DefaultLayout>

    )
}

export default Products