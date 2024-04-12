import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import moment from 'moment'
interface Product {
    id: any;
    img: any;
    title: any;
    price: any;
    quantity: any;
    createdAt: any
}
interface topProduct {
    id: any;
    img: any;
    title: any;
    quantity: any
};
export const GET = async (req: NextRequest) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: 'paid'
            }
        });
        let values = orders.reduce((acc: Record<string, any>, order) => {
            let products: any = order.products
            products.forEach((product: Product) => {
                const createdAt = order.createdAt;
                const date = moment(createdAt).format("YYYY-MM-DD")
                const quantity = product.quantity;
                if (acc[date]) {
                    acc[date].quantity += quantity;
                } else {
                    acc[date] = {
                        date: date,
                        quantity: quantity,
                    };
                }
            });
            return acc;
        }, {});
        values = Object.values(values)
        interface value {
            date: any,
            quantity: number
        }
        values.sort((a: value, b: value) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        const data: any[] = [];
        const day: any[] = [];
        values.map((item: any) => {
            data.push(item.quantity)
            day.push(item.date)
        })
        const result = {
            'name': 'paid',
            'data': data,
            'date': day
        };
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};