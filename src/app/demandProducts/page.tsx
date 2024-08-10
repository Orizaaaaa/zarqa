'use client'
import { url } from '@/api/auth'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatRupiah } from '@/utils/helper'
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

const fetcher = async (...args: Parameters<typeof fetch>) => {
    const [url, options] = args;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            'Authorization': token || '',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const DemanProducts = () => {
    const { data, error } = useSWR(`${url}/transaction/list`, fetcher, {
        keepPreviousData: true,
    });

    if (error) return <div>Error loading data</div>;

    const transaction = data?.data || [];

    const [page, setPage] = useState(1);
    const rowsPerPage = 9;

    const pages = Math.ceil(transaction.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return transaction.slice(start, end);
    }, [page, transaction]);

    return (
        <DefaultLayout>
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(newPage) => setPage(newPage)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[50vh]",
                }}
            >
                <TableHeader>
                    <TableColumn key="name">NAME</TableColumn>
                    <TableColumn key="product">PRODUK DAN SIZE</TableColumn>
                    <TableColumn key="color">WARNA</TableColumn>
                    <TableColumn key="price">HARGA</TableColumn>
                    <TableColumn key="stock">STOCK</TableColumn>
                    <TableColumn key="quantity">KUANTITAS</TableColumn>
                    <TableColumn key="total">TOTAL</TableColumn>
                    <TableColumn key="action">ACTION</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {items.map((transaction: any) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction?.user?.name}</TableCell>
                            <TableCell>{transaction.product_type.product.name} - {transaction.product_type.size}</TableCell>
                            <TableCell>{transaction.product_type.product.color}</TableCell>
                            <TableCell>{formatRupiah(transaction.product_type.price)}</TableCell>
                            <TableCell>{transaction.product_type.stock}</TableCell>
                            <TableCell>{transaction.qty}</TableCell>
                            <TableCell>{formatRupiah(transaction.grandtotal)}</TableCell>
                            <TableCell><Link href={`/demandProducts/${transaction.id}`}> <ButtonPrimary className='w-full py-2 rounded-md'>Detail</ButtonPrimary></Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DefaultLayout>
    );
};

export default DemanProducts;
