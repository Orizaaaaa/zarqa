'use client'
import Card from '@/components/elements/card/Card'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { getKeyValue, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());


const DemanProducts = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
        keepPreviousData: true,
    });
    console.log(data);

    const rowsPerPage = 10;

    const pages = useMemo(() => {
        return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
    }, [data?.count, rowsPerPage]);

    const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";
    return (
        <DefaultLayout>

            <Table
                aria-label="Example table with client async pagination"
                bottomContent={
                    pages > 0 ? (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    ) : null
                }
            >
                <TableHeader>
                    <TableColumn key="name">Nama Dropshiper</TableColumn>
                    <TableColumn key="height">Jumlah Barang</TableColumn>
                    <TableColumn key="mass">Mass</TableColumn>
                    <TableColumn key="birth_year">Status</TableColumn>
                </TableHeader>
                <TableBody
                    items={data?.results ?? []}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                >
                    {(item: any) => (
                        <TableRow key={item?.name}>
                            {(columnKey) => <TableCell>
                                {columnKey === "name" ? <Link href={`/demanProducts`}> {getKeyValue(item, columnKey)}</Link>
                                    : getKeyValue(item, columnKey)}  </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </DefaultLayout>

    )
}

export default DemanProducts