import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const categories = await prisma.category.findMany();
        const slugs = categories.map((item) => item.slug)
        const product = await prisma.product.findMany(
            {
                where: {
                    catSlug: { in: slugs },
                },
            }
        );
        const data = categories.map((category) => {
            const productsInCategory = product.filter((item) => item.catSlug == category.slug)
            return { ...category, items: productsInCategory }
        })
        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};