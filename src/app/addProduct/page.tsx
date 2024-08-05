'use client'

import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { SwiperSlide } from 'swiper/react'

type Props = {}

const AddProduct = (props: Props) => {
    const [form, setForm] = React.useState({
        title: '',
        description: '',
        warna: '',
        images: [] as File[]
    })
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

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

    return (
        <DefaultLayout>
            <div className="grid grid-cols-6 gap-3">
                <Card className='col-span-4' padding='p-3'>
                    <h1 className='text-xl font-medium' >General Information</h1>
                    <div className="input mt-5">
                        <InputForm className='bg-[#EEEEEE]' htmlFor="title" title="Nama Produk" type="text" onChange={handleChange} value={form.title} placeholder="" />

                        <label htmlFor="description" className="block mt-4 mb-1 font-medium ">Deskripsi</label>
                        <textarea name="description" onChange={handleChange} value={form.description}
                            className="block text-black p-2.5 w-full  h-34 text-sm rounded-lg bg-[#EEEEEE] outline-none"
                            placeholder=""></textarea>

                        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
                            <div className="size">
                                <h1 className=' font-medium' >Size</h1>
                                <p className='text-sm text-graydark'>Pilih ukuran yang tersedia</p>
                                <div className="flex mt-2 mb-6 gap-3">
                                    <button className='w-11 h-11 bg-[#EEEEEE] rounded-md flex justify-center items-center font-semibold'>
                                        S
                                    </button>
                                    <button className='w-11 h-11 bg-[#EEEEEE] rounded-md flex justify-center items-center font-semibold'>
                                        M
                                    </button>
                                    <button className='w-11 h-11 bg-[#EEEEEE] rounded-md flex justify-center items-center font-semibold'>
                                        L
                                    </button>
                                    <button className='w-11 h-11 bg-[#EEEEEE] rounded-md flex justify-center items-center font-semibold'>
                                        XL
                                    </button>
                                    <button className='w-11 h-11 bg-[#EEEEEE] rounded-md flex justify-center items-center font-semibold'>
                                        XXL
                                    </button>
                                </div>

                            </div>
                            <div className="color">
                                <h1 className=' font-medium' >Warna</h1>
                                <p className='text-sm text-graydark'>Masukan warna produk</p>
                                <InputForm className='border-2 border-primary mt-3 ' htmlFor="warna" type="text" onChange={handleChange} value={form.warna} placeholder="" />
                            </div>
                        </div>

                        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 ">
                            <InputForm className='bg-[#EEEEEE]' htmlFor="title" title="Harga" type="text" onChange={handleChange} value={form.title} placeholder="" />
                            <InputForm className='bg-[#EEEEEE]' htmlFor="title" title="Stock" type="text" onChange={handleChange} value={form.title} placeholder="" />
                        </div>


                    </div>

                </Card>

                <Card className='col-span-2' padding='p-5' >
                    <CaraoselImage>
                        {form.images.length > 0 && (
                            form.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <>
                                        <div className="flex justify-center items-center" style={{ pointerEvents: 'none' }}>
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
                        )}
                    </CaraoselImage>
                    <h1 className='my-3 font-semibold text-lg' >Dress besi model anak punk...</h1>
                    <p className='text-sm text-gray'> Dress ini memiliki kualitas yang baik dari segi material
                        dengan campuran warna yang cocok, mampu
                        menciptakan perpaduan yang tolol...</p>

                    <h1 className='my-3 font-medium' >Ukuran Yang Tersedia </h1>
                    <div className="grid grid-cols-10">
                        <p className='col-span-4 text-gray'>S</p>
                        <div className="col-span-6 flex  text-gray ms-2">: 5889 </div>
                    </div>
                    <div className="grid grid-cols-10">
                        <p className='col-span-4 text-gray'>M</p>
                        <div className="col-span-6 flex  text-gray ms-2">: 5889  </div>
                    </div>
                    <div className="grid grid-cols-10">
                        <p className='col-span-4 text-gray'>L</p>
                        <div className="col-span-6 flex  text-gray ms-2">: 5889 </div>
                    </div>
                    <div className="grid grid-cols-10">
                        <p className='col-span-4 text-gray'>XL</p>
                        <div className="col-span-6 flex  text-gray ms-2">: 5889 </div>
                    </div>
                    <div className="grid grid-cols-10">
                        <p className='col-span-4 text-gray'>XXL</p>
                        <div className="col-span-6 flex  text-gray ms-2">: 5889 </div>
                    </div>

                    <div className="grid grid-cols-2 justify-between my-5 gap-4">
                        <ButtonPrimary className='rounded-md' >Tambah Image</ButtonPrimary>
                        <ButtonSecondary className='rounded-md' >Hapus Semua</ButtonSecondary>
                    </div>
                    <ButtonPrimary className='rounded-md w-full ' >Buat Product</ButtonPrimary>


                    {/* <button >tambah
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="image-input-add"
                            onChange={(e) => handleImageChange(e, 'add')}
                        />
                    </button> */}
                </Card>
            </div>
        </DefaultLayout>
    )
}

export default AddProduct