import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
interface Product {
    id: any;
    img: any;
    title: any;
    price: any;
    quantity: any
}
interface topProduct {
    id: any;
    img: any;
    title: any;
    quantity: any
};
export const GET = async (req: NextRequest) => {
    try {
        const limit = req.nextUrl.searchParams.get("limit") ?? 3;
        const orders = await prisma.order.findMany({
            where: {
                status: 'paid'
            }
        });
        let topProducts = orders.reduce((acc: Record<string, any>, order) => {
            let products: any = order.products
            products.forEach((product: Product) => {
                const productId = product.id;
                const quantity = product.quantity;
                const img = product.img;
                const title = product.title;
                if (acc[productId]) {
                    acc[productId].quantity += quantity;
                } else {
                    acc[productId] = {
                        id: productId,
                        quantity: quantity,
                        img: img, title
                    };
                }
            });
            return acc;
        }, {});
        topProducts = Object.values(topProducts);
        topProducts.sort((a: topProduct, b: topProduct) => b.quantity - a.quantity);
        topProducts = topProducts.slice(0, limit);
        return new NextResponse(JSON.stringify(topProducts), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};