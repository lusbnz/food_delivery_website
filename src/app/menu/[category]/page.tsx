"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CategorySwitchPage from "@/components/CategorySwitch";

interface Product {
  id: any;
  img: any;
  title: any;
  price: any;
}

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = usePathname();
  const categories = router.split("/");
  const category = categories[categories.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/products/find-all`);
        if (!res.ok) {
          throw new Error("Failed to fetch data!");
        }
        const data = await res.json();
        const categoryData = data.find((cat: any) => cat.slug === category);
        const items = categoryData
          ? categoryData.items
          : data.flatMap((cat: any) => cat.items);
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="flex xl:flex-row flex-col mb-12 md:mb-0">
      <CategorySwitchPage />
      <div className="flex flex-7 flex-wrap w-full text-red-500 min-h-screen overflow-hidden">
        {products.map((item: Product) => (
          <Link
            href={`/product/${item.id}`}
            key={item.id}
            className="w-full h-[60vh] sm:w-1/2 lg:w-1/3 p-8 flex flex-col justify-between group odd:bg-fuchsia-50 hover:bg-fuchsia-100 border-b border-l"
          >
            {item.img && (
              <div className="relative h-[80%] hover:rotate-[60deg] hover:scale-110 transition-all duration-300">
                <Image
                  src={item.img}
                  alt="category item"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex items-center justify-between font-bold">
              <h1 className="text-lg uppercase p-2">{item.title}</h1>
              <h2 className="group-hover:hidden text-lg">{item.price} VNĐ</h2>
              <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
                Thêm vào giỏ hàng
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
