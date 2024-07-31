"use client"

import Card from "@/components/elements/card/Card";
import { manusiaLaptop } from "../image";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import CardBox from "@/components/fragemnts/cardBox/CardBox";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartOne from "@/components/fragemnts/Charts/ChartOne";

const Dashboard: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"line"> | null>(null);
    const donutChartRef = useRef<HTMLCanvasElement | null>(null);
    const donutChartInstanceRef = useRef<Chart<"doughnut"> | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext("2d");

        if (ctx) {
            // Destroy existing chart instance
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Create new chart instance with two datasets (lines)
            chartInstanceRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                    datasets: [
                        {
                            label: "Total Pengguna",
                            data: [10, 17, 30, 15, 20, 25, 33, 10, 90, 20],
                            borderColor: "#883DCF",
                            borderWidth: 2,
                        },
                        {
                            label: "Posko",
                            data: [
                                5, 15, 25, 33, 34, 12, 67, 33, 12, 10, 40, 50, 20, 40, 30,
                            ],
                            borderColor: "#F86624",
                            borderWidth: 2,

                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            position: "top",
                            align: "end",
                            labels: {
                                usePointStyle: true,
                                generateLabels: function (chart: any) {
                                    const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                                    labels.forEach((label: any) => {
                                        if (label.text === "Total Pengguna") {
                                            label.fillStyle = "#883DCF";
                                        } else if (label.text === "Posko") {
                                            label.fillStyle = "#F86624";
                                        }
                                    });
                                    return labels;
                                },

                            },
                        },
                        title: {
                            display: true,
                            text: "Statistik ",
                            font: {
                                size: 20,
                            },
                            color: "black",
                            position: "top",
                            align: "start",
                            padding: 20
                        },
                        subtitle: {
                            display: true,
                            text: "Dari Pengguna dan Posko",
                            font: {
                                size: 14
                            },
                            align: "start",

                        }
                    },
                },
            });
        }

        const donutCtx = donutChartRef.current?.getContext("2d");
        if (donutCtx) {
            // Destroy existing donut chart instance
            if (donutChartInstanceRef.current) {
                donutChartInstanceRef.current.destroy();
            }


            // Create new donut chart instance
            donutChartInstanceRef.current = new Chart(donutCtx, {
                type: "doughnut",
                data: {
                    labels: ['Donatur', 'Pengambilan Makanan'],
                    datasets: [
                        {
                            data: [90, 100],
                            backgroundColor: ["#883DCF", "#F86624"],
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                            align: "center",
                            labels: {
                                usePointStyle: true,
                            },
                        },
                        title: {
                            display: true,
                            text: "Pelaporan",
                            font: {
                                size: 16,
                            },
                            color: "black",
                            position: "top",
                            align: "start",
                            padding: 20
                        },

                        subtitle: {
                            display: true,
                            text: "Donatur & Pengambilan Makanan  ",
                            font: {
                                size: 14,
                            },
                            align: "start",
                        }
                    },
                },
            });
        }

    }, []);


    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-medium md:text-2xl md:font-bold font-inter" >Selamat Datang Kembali, Admin!</h1>
                        <p className="text-slate-400 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan mengelola situs ini.</p>
                    </div>
                    <div className="flex justify-center">
                        <Image src={manusiaLaptop} alt="dashboard" />
                    </div>
                </div>
            </Card>

            <div className="mt-5 grid grid-cols-4 gap-5">
                <CardBox />
                <CardBox />
                <CardBox />
                <CardBox />
            </div>


            <Card className=" col-span-4 w-full h-full min-h-[70vh] mt-5"  >
                <canvas className="w-full h-full bg-white" ref={chartRef} ></canvas>
            </Card>
        </DefaultLayout>

    );
};

export default Dashboard;
