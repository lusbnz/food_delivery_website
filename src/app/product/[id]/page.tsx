import DeleteButton from "@/components/DeleteButton";
import ImageWithFallback from "@/components/ImageWithFallBack";
import Loading from "@/components/Loading";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`${process.env.URL_BACKEND}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType | null = await getData(params.id);

  if (!singleProduct) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%] hover:rotate-[60deg] hover:scale-110 transition-all duration-300">
          <ImageWithFallback src={singleProduct.img} alt="" />
        </div>
      )}
      <div className="lg:border-l-2 lg:border-red-500 lg:border-separate lg:pl-36 xl:pl-52 h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase">
          <span>{singleProduct.title}</span>
        </h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
};

export default SingleProductPage;
