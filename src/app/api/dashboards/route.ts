import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import moment from 'moment'
import { getSession } from "next-auth/react";
import { getAuthSession } from "@/utils/auth";
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
interface value {
    date: any,
    quantity: number
}
export const GET = async (req: NextRequest) => {
    try {
        const month = req.nextUrl.searchParams.get("month") ?? "3";
        const session = await getAuthSession();
        const user_email:any=session?.user.email||"";
        const startDate = new Date(2024,parseInt(month)-1,1)
        const endDate = new Date(2024,parseInt(month))
        let orders=[];
        const dateInMonth = getDaysInMonth(parseInt(month)-1,2024)
        if(session?.user.isAdmin){
             orders = await prisma.order.findMany({
                where: {
                    status: 'paid',
                    createdAt:{
                        gte:startDate,
                        lt:endDate
                    }
                }
            });
        }
        else{
             orders = await prisma.order.findMany({
                where: {
                    userEmail:user_email,
                    status: 'paid',
                    createdAt:{
                        gte:startDate,
                        lt:endDate
                    }
                }
            });
        }
        
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
        dateInMonth.map((item:any)=>{
            if(!values[item]) values[item]={
                date: item,
                quantity:0
            }
        })
        values = Object.values(values)
        
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
function getDaysInMonth(month:number, year:number) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(moment(new Date(date)).format("YYYY-MM-DD"));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  