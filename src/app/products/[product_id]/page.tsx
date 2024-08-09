'use client'
import { getDetailProduct } from '@/api/products';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import ButtonSecondary from '@/components/elements/buttonSecondary';
import Card from '@/components/elements/card/Card';
import InputForm from '@/components/elements/input/InputForm';
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatRupiah } from '@/utils/helper';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { IoClose, IoCloseCircleOutline } from 'react-icons/io5';
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
    const [formUpdate, setFormUpdate] = useState(false)
    const [imageFiles, setImageFiles] = useState([] as File[]);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const { product_id } = useParams();
    const [loading, setLoading] = useState(false)
    const [dataProduct, setDataProduct] = useState<Product | null>(null);
    useEffect(() => {
        setLoading(true)
        getDetailProduct(product_id, (result: any) => {
            setDataProduct(result)
            setLoading(false)
        })
    }, [product_id]);

    const [form, setForm]: any = useState({
        name: '',
        supplierId: '',
        color: '',
        images: [] as string[],
        productType: [
            {
                size: '',
                price: '',
                stock: '',
            }
        ],
    });


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: (name === 'price' || name === 'stock') ? Number(value) : value
        });
    };



    //handle button size dinamis
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const selectedProduct = form.productType.find((product: any) => product.size === selectedSize);
    const handleSizeClick = (size: any) => {
        setSelectedSize(size);
        if (!form.productType.some((product: any) => product.size === size)) {
            const newProductType = [...form.productType, { size, price: '', stock: '' }];
            setForm({ ...form, productType: newProductType });
        }
    };

    //manajemen state input product type
    const updateProductType = (key: 'price' | 'stock', value: string) => {
        const numberValue = Number(value);
        const updatedProductType = form.productType.map((product: any) => {
            if (product.size === selectedSize) {
                return { ...product, [key]: numberValue };
            }
            return product;
        });
        setForm({ ...form, productType: updatedProductType });
    };


    //untuk menghapus size serta harga dan stock nya
    const handleDeleteSize = (size: string) => {
        const updatedProductType = form.productType.filter((product: any) => product.size !== size);
        setForm({ ...form, productType: updatedProductType });
        setSelectedSize(updatedProductType.length > 0 ? updatedProductType[0].size : 'S');
    };


    //menambah gambar serta memasukan gambar file array ke state imagesFile
    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files[0]) {
            const newImageURL = URL.createObjectURL(files[0]);
            const updatedImages = [...form.images, newImageURL];
            const updatedImageFiles = [...imageFiles, files[0]]; // Menyimpan file asli

            setForm({ ...form, images: updatedImages });
            setImageFiles(updatedImageFiles); // Update state dengan file asli
        }
    };


    //ini adalah delete image array, akan tetapi untuk kesana nya akan menggunakan pengkondisian jika mengandung cloudinary
    const handleDeleteImage = (index: number) => {
        const updatedImages = form.images.filter((_: string, i: number) => i !== index);
        setForm({ ...form, images: updatedImages });
    };


    //memasukan state serta merubah menjadi form update
    const toUpdate = () => {
        setFormUpdate(true)
        setForm({
            ...form, name: dataProduct?.name, supplierId: dataProduct?.supplier?._id, color: dataProduct?.color, productType: dataProduct?.productType,
            images: dataProduct?.images
        })

    }

    const handleUpdate = () => {
        console.log('aman');
    }



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
                            {formUpdate ? (
                                form.images.map((image: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex justify-center items-center relative">
                                            <img
                                                src={image}
                                                className="w-full lg:w-[500px] h-[350px] md:h-[500px] rounded-lg"
                                                style={{ pointerEvents: 'none' }}
                                            />
                                            <button
                                                className="button-delete array image absolute top-0 right-0 z-10"
                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                <IoCloseCircleOutline color="red" size={34} />
                                            </button>
                                        </div>


                                    </SwiperSlide>
                                ))
                            ) : (
                                dataProduct?.images?.map((image: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={image}
                                                className="w-full lg:w-[500px] h-[350px] md:h-[500px] rounded-lg "
                                                style={{ pointerEvents: 'none' }}
                                            />
                                        </div>

                                    </SwiperSlide>
                                ))
                            )}

                        </Swiper>

                    </div>

                    <div className="right ">
                        {formUpdate ? (
                            <>
                                <InputForm className=' bg-[#EEEEEE]' htmlFor="name" title="Nama Produk" type="text" onChange={handleChange} value={form.name} placeholder="" />

                                <div className="color">
                                    <h1 className='font-medium'>Warna</h1>
                                    <p className='text-sm text-graydark'>Masukan warna produk</p>
                                    <InputForm className='border-2 border-primary mt-3' htmlFor="color" type="text" onChange={handleChange} value={form.color} placeholder="" />
                                </div>

                                <div className="size">
                                    <h1 className='font-medium'>Size</h1>
                                    <p className='text-sm text-graydark'>Pilih ukuran yang tersedia</p>
                                    <div className="flex my-2  gap-3">
                                        {sizes.map(size => (
                                            <button
                                                key={size}
                                                className={`w-11 h-11 ${form.productType.some((product: any) => product.size === size) ? 'bg-black text-white' : 'bg-[#EEEEEE]'} rounded-md flex justify-center items-center font-semibold`}
                                                onClick={() => handleSizeClick(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}

                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    {selectedProduct ? (
                                        <button key={selectedProduct.size}
                                            className="flex items-center text-red-500"
                                            onClick={() => handleDeleteSize(selectedProduct.size)}
                                        >
                                            <IoClose size={25} color="red" />
                                            {selectedProduct.size}
                                        </button>
                                    ) : null}
                                </div>

                                {/* Form untuk price dan stock */}
                                <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                                    <InputForm className='bg-[#EEEEEE]' htmlFor="price" title="Harga" type="number" onChange={(e: any) => updateProductType('price', e.target.value)} value={selectedProduct?.price || ''} placeholder="" />
                                    <InputForm className='bg-[#EEEEEE]' htmlFor="stock" title="Stock" type="number" onChange={(e: any) => updateProductType('stock', e.target.value)} value={selectedProduct?.stock || ''} placeholder="" />
                                </div>

                                <ButtonSecondary className='image-upload flex justify-center items-center mt-5 px-5 py-2 rounded-md cursor-pointer' ><input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAddImage}
                                    className="hidden"
                                    id="image-upload"
                                />
                                    <label className='cursor-pointer' htmlFor="image-upload" >
                                        Tambah Image
                                    </label>
                                </ButtonSecondary>

                            </>

                        ) :
                            <>
                                <h1 className='font-medium text-lg' >{dataProduct?.name}</h1>
                                <div className="size-price gap-2 my-4 border-dashed border-2 border-[#636363] rounded-md p-3">
                                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {dataProduct?.productType?.map((item, index) => (
                                            <div className="grid grid-cols-10 text-sm" key={index}>
                                                <p className='col-span-1 text-gray'>{item.size}</p >
                                                <div className="col-span-9 flex text-gray ms-2"> : {item.stock} Pcs - {formatRupiah(item.price)}</div>
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



                            </>
                        }


                        <div className="flex gap-2 justify-end mt-4">
                            <ButtonPrimary className='px-5 py-2 rounded-md' onClick={formUpdate ? handleUpdate : toUpdate} > {formUpdate ? 'Selesai' : 'Update'}</ButtonPrimary>
                            <ButtonSecondary className='px-5 py-2 rounded-md' >Hapus</ButtonSecondary>
                        </div>

                    </div>
                </div>

            </Card>


        </DefaultLayout >
    )
}

export default DetailProduct