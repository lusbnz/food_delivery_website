import React from "react";
import Chart, { Props } from "react-apexcharts";

const getData = async () => {
    const res = await fetch(`/api/dashboards?month=3`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed!");
    }

    return res.json();
};

export const Steam = async () => {

    const dataApi = await getData()

    const state: Props["series"] = [
        {
            name: "Thu nhập",
            data: [11, 32, 45, 32, 34, 52, 41],
        },
        {
            name: "Chi phí",
            data: [31, 40, 28, 51, 42, 109, 100],
        },
    ];

    const stateII: Props["series"] = [{
        name: 'Khách hàng',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
        name: 'Thu nhập',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }, {
        name: 'Lợi nhuận',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }]

    const stateIII: Props["series"] = [{
        name: 'Khách hàng',
        data: dataApi.data,
    }]

    const options: Props["options"] = {
        chart: {
            type: "area",
            animations: {
                easing: "linear",
                speed: 300,
            },
            sparkline: {
                enabled: false,
            },
            brush: {
                enabled: false,
            },
            id: "basic-bar",
            foreColor: "hsl(var(--nextui-default-800))",
            stacked: true,
            toolbar: {
                show: true,
            },
        },

        xaxis: {
            categories: ["10-2023", "11-2023", "12-2023", "01-2024", "02-2024", "03-2024", "04-2024"],
            labels: {
                style: {
                    colors: "hsl(var(--nextui-default-800))",
                },
            },
            axisBorder: {
                color: "hsl(var(--nextui-nextui-default-200))",
            },
            axisTicks: {
                color: "hsl(var(--nextui-nextui-default-200))",
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "hsl(var(--nextui-default-800))",
                },
            },
        },
        tooltip: {
            enabled: false,
        },
        grid: {
            show: true,
            borderColor: "hsl(var(--nextui-default-200))",
            strokeDashArray: 0,
            position: "back",
        },
        stroke: {
            curve: "smooth",
            fill: {
                colors: ["red"],
            },
        },
        // @ts-ignore
        markers: false,
    };

    const optionII: Props["options"] = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },

        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
            '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            title: {
                text: 'Doanh thu',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " phần trăm";
                    }
                    return y;

                }
            }
        }
    };

    const optionIII: Props["options"] = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: dataApi.date
        }
    };

    return (
        <>
            <div className="w-full z-20 flex flex-col gap-8">
                <div id="chart">
                    <Chart options={options} series={state} type="area" height={425} />
                </div>
                <div id="chart">
                    <Chart options={optionII} series={stateII} height={425} />
                </div>
                <div id="chart">
                    <Chart options={optionIII} series={stateIII} type="bar" height={425} />
                </div>
            </div>
        </>
    );
};