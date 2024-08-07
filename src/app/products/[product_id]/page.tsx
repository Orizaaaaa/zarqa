'use client'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useParams } from 'next/navigation'


const DetailProduct = () => {
    const { product_id } = useParams();
    console.log(product_id);
    return (
        <DefaultLayout>
            <h1>Halaman Detail</h1>
        </DefaultLayout>
    )
}

export default DetailProduct