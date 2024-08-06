import { jaket, kardus } from '@/app/image'
import Card from '@/components/elements/card/Card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

type Props = {}

const CardProduct = (props: Props) => {
    return (
        <Card padding="p-3 rounded-sm">
            <div className="images min-h-[200px] w-full">
                <Link href={'#'}>
                    <Image className="w-full rounded-md" src={jaket} alt="jaket" />
                </Link>
            </div>
            <h1>Dress kondangan...</h1>
            <div className="flex gap-1 mt-2">
                <Image className="w-5 h-5" src={kardus} alt="kardus" />
                <p className="text-sm text-slate-500 " >150 Pcs</p>
            </div>

            <div className="flex justify-end">
                <button><BsThreeDots size={20} /></button>
            </div>
        </Card >
    )
}

export default CardProduct