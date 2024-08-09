'use client'

import { createProduct } from '@/api/products'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Image from 'next/image'
import React from 'react'
import { IoClose, IoCloseCircleOutline } from 'react-icons/io5'
import { SwiperSlide } from 'swiper/react'
import { inputIMage } from '../image'
import { postImagesArray } from '@/api/imagePost'
import { Spinner } from '@nextui-org/react'



const AddProduct = () => {
    const [selectedSize, setSelectedSize] = React.useState<string>('S');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [form, setForm] = React.useState({
        name: '',
        supplierId: '66a736172d8b834d7f049204',
        color: '',
        images: [] as File[],
        productType: [
            {
                size: 'S',
                price: '',
                stock: '',
            }
        ],
    });


    //perubahan text
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: (name === 'price' || name === 'stock') ? Number(value) : value
        });
    };


    //handle button size dinamis
    const handleSizeClick = (size: string) => {
        setSelectedSize(size);
        if (!form.productType.some(product => product.size === size)) {
            const newProductType = [...form.productType, { size, price: '', stock: '' }];
            setForm({ ...form, productType: newProductType });
        }
    };

    const updateProductType = (key: 'price' | 'stock', value: string) => {
        const numberValue = Number(value);
        const updatedProductType = form.productType.map(product => {
            if (product.size === selectedSize) {
                return { ...product, [key]: numberValue };
            }
            return product;
        });
        setForm({ ...form, productType: updatedProductType });
    };

    const handleDelete = (size: string) => {
        const updatedProductType = form.productType.filter(product => product.size !== size);
        setForm({ ...form, productType: updatedProductType });
        setSelectedSize(updatedProductType.length > 0 ? updatedProductType[0].size : 'S');
    };

    const selectedProduct = form.productType.find(product => product.size === selectedSize);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];



    //image handle
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            if (selectedImage) {
                setForm(prevState => ({
                    ...prevState,
                    images: [...prevState.images, selectedImage]
                }));
            }
        } else {
            console.log('error');
        }
    };

    const deleteArrayImage = (index: number) => {
        setForm(prevState => ({
            ...prevState,
            images: prevState.images.filter((_, i) => i !== index)
        }));
    };

    const handleCreateProduct = async () => {
        setLoading(true);
        if (!form.name || !form.color || !form.images.length || !form.productType.length) {
            setError(true);
            setLoading(false);
        } else {
            setError(false);
            const urls: string[] = await postImagesArray({ images: form.images })
            const data = {
                ...form,
                images: urls
            }
            createProduct(data, (status: any, result: any) => {
                if (status) {
                    console.log('success');
                    console.log(result);
                } else {
                    console.log(result);
                }
            })

            setForm({
                name: '',
                supplierId: '66a736172d8b834d7f049204',
                color: '',
                images: [] as File[],
                productType: [
                    {
                        size: 'S',
                        price: '',
                        stock: '',
                    }
                ],
            });
            setLoading(false);
        }
    };




    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
                <Card className='lg:col-span-4' padding='p-3'>
                    <h1 className='text-xl font-medium'>General Information</h1>
                    <div className="input mt-5">
                        <InputForm className='bg-[#EEEEEE]' htmlFor="name" title="Nama Produk" type="text" onChange={handleChange} value={form.name} placeholder="" />

                        {/* ini adalah form deskripsi jaga jaga kalo nanti kepake */}

                        {/* <label htmlFor="description" className="block mt-4 mb-1 font-medium">Deskripsi</label>
                        <textarea name="description" onChange={handleChange} value={form.description}
                            className="block text-black p-2.5 w-full h-34 text-sm rounded-lg bg-[#EEEEEE] outline-none"
                            placeholder=""></textarea> */}

                        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
                            <div className="size">
                                <h1 className='font-medium'>Size</h1>
                                <p className='text-sm text-graydark'>Pilih ukuran yang tersedia</p>
                                <div className="flex mt-2 mb-6 gap-3">
                                    {sizes.map(size => (
                                        <button key={size}
                                            className={`w-11 h-11 ${form.productType.some(product => product.size === size) ? 'bg-black text-white' : 'bg-[#EEEEEE]'} rounded-md flex justify-center items-center font-semibold`}
                                            onClick={() => handleSizeClick(size)}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="color">
                                <h1 className='font-medium'>Warna</h1>
                                <p className='text-sm text-graydark'>Masukan warna produk</p>
                                <InputForm className='border-2 border-primary mt-3' htmlFor="color" type="text" onChange={handleChange} value={form.color} placeholder="" />
                            </div>
                        </div>

                        {/* Form untuk price dan stock */}
                        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                            <InputForm className='bg-[#EEEEEE]' htmlFor="price" title="Harga" type="number" onChange={(e: any) => updateProductType('price', e.target.value)} value={selectedProduct?.price || ''} placeholder="" />
                            <InputForm className='bg-[#EEEEEE]' htmlFor="stock" title="Stock" type="number" onChange={(e: any) => updateProductType('stock', e.target.value)} value={selectedProduct?.stock || ''} placeholder="" />
                        </div>
                    </div>

                </Card>

                {/* card right */}
                <Card className='lg:col-span-2 h-full flex flex-col justify-end ' padding='p-3 lg:p-5' >

                    {/* caraosel */}
                    <div>
                        <CaraoselImage>
                            {form.images.length > 0 ? (
                                form.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <>
                                            <div className="flex justify-center items-center " style={{ pointerEvents: 'none' }}>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`preview-${index}`}
                                                    className="w-auto h-[350px] relative"
                                                />
                                            </div>
                                            <button onClick={() => deleteArrayImage(index)} className="button-delete array image absolute top-0 right-0 z-10 "  ><IoCloseCircleOutline color="red" size={34} /></button>
                                        </>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <div className='flex justify-center'>
                                    <Image className="w-auto h-[350px] relative " src={inputIMage} alt="image"></Image>
                                </div>
                            )}
                        </CaraoselImage>

                    </div>


                    {/* title and size */}
                    <div >
                        <h1 className='my-3 font-semibold text-lg' >{form.name}</h1>

                        {/* <p className='text-sm text-gray'> Dress ini memiliki kualitas yang baik dari segi material
                            dengan campuran warna yang cocok, mampu
                            menciptakan perpaduan yang tolol...</p> */}

                        <h1 className='my-3 font-medium' >Ukuran Yang Tersedia </h1>
                        {form.productType.map(product => (
                            <div key={product.size} className="grid grid-cols-10 text-sm">
                                <p className='col-span-4 text-gray'>{product.size}</p>
                                <div className="col-span-6 flex text-gray ms-2">: {product.stock}
                                    <button className="ml-2 text-red-500" onClick={() => handleDelete(product.size)}><IoClose color="red" /></button>
                                </div>
                            </div>
                        ))}


                        <div className="grid grid-cols-2 justify-between my-5 gap-2">
                            <ButtonPrimary className='rounded-md relative cursor-pointer py-2 px-1' >Tambah Image
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="image-input-add"
                                    onChange={(e) => handleImageChange(e, 'add')}
                                />
                            </ButtonPrimary>
                            <ButtonSecondary className='rounded-md  py-2 px-1' onClick={() => setForm(prevForm => ({ ...prevForm, images: [] }))} >Hapus Semua</ButtonSecondary>
                        </div>
                        <ButtonPrimary className='rounded-md w-full py-2 px-1' onClick={handleCreateProduct}>
                            {loading ? <Spinner className={`w-5 h-5 `} size="sm" color="white" /> : 'Buat Product'}
                        </ButtonPrimary>
                        <p className={`mt-3 text-sm text-red ${error ? 'block' : 'hidden'}`} > <i>*Error, tolong isi semua form nya dengan benar</i> </p>
                    </div>

                </Card>
            </div>
        </DefaultLayout>
    )
}

export default AddProduct