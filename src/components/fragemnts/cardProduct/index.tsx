import { jaket, kardus } from '@/app/image'
import Card from '@/components/elements/card/Card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

type Props = {
    name: string
    image: string
    location?: string
    stock: number
}

const CardProduct = ({ image, location, stock, name }: Props) => {
    return (
        <Card padding="p-3 rounded-sm">
            <div className="images min-h-[200px] w-full">
                <Link href={'#'}>
                    <img className="w-full h-[190px] md:h-[250px] rounded-md" src={image} alt="jaket" />
                </Link>
            </div>
            <h1 className='mt-1 md:mt-2 font-medium' >{name}</h1>
            <div className="flex gap-1 mt-2">
                <Image className="w-5 h-5" src={kardus} alt="kardus" />
                <p className="text-sm text-slate-500 " >{stock} Pcs</p>
            </div>

            {/* <div className="flex justify-end">
                <button><BsThreeDots size={20} /></button>
            </div> */}
        </Card >
    )
}

export default CardProduct