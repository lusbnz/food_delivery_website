import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.URL_BACKEND}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const Featured = async () => {
  const featuredProducts: ProductType[] = await getData();

  return (
    <div className="w-screen overflow-x-hidden text-red-500">
      <div className="w-max flex">
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 md:w-[50vw] lg:w-[33vw] xl:h-[90vh]  hover:bg-fuchsia-100"
          >
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] hover:scale-105 transition-all duration-300 pt-4">
                <Image
                  src={item.img}
                  alt="featured item"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1 flex flex-col w-full items-center text-center justify-around gap-4 transition-all duration-300">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                {item.title}
              </h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">{item.price} VNĐ</span>
              <Link href={`/product/${item.id}`}>
                <button className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600">
                  Thêm vào giỏ hàng
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
