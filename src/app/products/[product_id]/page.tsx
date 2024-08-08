'use client'
import { getDetailProduct } from '@/api/products';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import ButtonSecondary from '@/components/elements/buttonSecondary';
import Card from '@/components/elements/card/Card';
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Supplier {
    _id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    created_at: string;
    __v: number;
}
interface ProductType {
    id: string;
    size: string;
    price: number;
    stock: number;
}

interface Product {
    id: string;
    name: string;
    images: string[];
    supplier: Supplier;
    color: string;
    total_stock: number;
    productType: ProductType[];
}


const DetailProduct = () => {
    const { product_id } = useParams();
    const [loading, setLoading] = useState(false)
    const [dataProduct, setDataProduct] = useState<Product | null>(null);
    useEffect(() => {
        setLoading(true)
        getDetailProduct(product_id, (result: any) => {
            setDataProduct(result)
            setLoading(false)
        })
    }, []);

    const suplierData = [
        {
            text: 'Nama',
            data: dataProduct?.supplier?.name
        },
        {
            text: 'Email',
            data: dataProduct?.supplier?.email
        },
        {
            text: 'No Handphone',
            data: dataProduct?.supplier?.phone
        },
        {
            text: 'Alamat',
            data: dataProduct?.supplier?.address
        }
    ]


    return (
        <DefaultLayout>
            <Card padding='p-3 min-h-[85vh] flex flex-col items-center justify-center' >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex justify-center items-center h-full' >
                        <Swiper
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {dataProduct?.images?.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={image}
                                            className="w-full lg:w-[500px] h-[350px] md:h-[500px] rounded-lg "
                                            style={{ pointerEvents: 'none' }}
                                        />
                                    </div>

                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>

                    <div className="right ">
                        <h1 className='font-medium text-lg' >{dataProduct?.name}</h1>
                        <div className="size-price gap-2 my-4 border-dashed border-2 border-[#636363] rounded-md p-3">
                            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                                {dataProduct?.productType?.map((item, index) => (
                                    <div className="grid grid-cols-10 text-sm" key={index}>
                                        <p className='col-span-1 text-gray'>{item.size}</p >
                                        <div className="col-span-9 flex text-gray ms-2"> : {item.stock} Pcs - {item.price}</div>
                                    </div>
                                ))}
                            </div>

                            <p className='text-sm text-gray mt-5' ><i  >Total stock keseluruhan adalah {dataProduct?.total_stock}</i></p>
                        </div>

                        <h1 className='font-medium text-lg' >Supplier Information</h1>
                        <hr className='mb-5' />

                        {suplierData?.map((item, index) => (
                            <h1 key={index} className='font-medium text-md mb-2 ' > {item.text} : <span className='text-gray' >{item.data}</span> </h1>
                        ))}

                        <div className="flex gap-2 justify-end mt-4">
                            <ButtonPrimary className='px-5 py-2 rounded-md' >Update</ButtonPrimary>
                            <ButtonSecondary className='px-5 py-2 rounded-md' >Delete</ButtonSecondary>
                        </div>
                    </div>
                </div>

            </Card>
        </DefaultLayout >
    )
}

export default DetailProduct