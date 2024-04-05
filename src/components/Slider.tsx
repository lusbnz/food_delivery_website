"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "Nhanh chóng",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "Ngon miệng",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "An toàn",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      <div className="flex items-center justify-center flex-col gap-8 text-red-500 font-bold flex-1">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <Link href="/menu">
          <button className="bg-red-500 text-white py-4 px-8 hover:bg-red-600 rounded-xl">
            Đặt hàng ngay
          </button>
        </Link>
      </div>
      <div className="w-full relative flex-1">
        <Image
          src={data[currentSlide].image}
          alt="slide"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
