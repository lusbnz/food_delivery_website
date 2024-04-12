"use client"

import dynamic from 'next/dynamic';
import React from 'react'

const Chart = dynamic(
    () => import("@/components/Steam").then((mod) => mod.Steam),
    {
        ssr: false,
    }
);

const DashboardPage = () => {
    return (
        <div className="p-4 lg:px-20 xl:px-40 min-h-screen">
            <div className="h-full flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Thống kê doanh thu</h3>
                <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                    <Chart />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage