import Image from "next/image";
import CountDown from "./CountDown";
import Link from "next/link";

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Thơm ngon hảo hạng
        </h1>
        <p className="text-white xl:text-xl">
          Điểm đến lý tưởng cho mọi người. Ánh sáng dịu dàng chiếu vào nơi đầy ổ
          bánh mì và các loại thực phẩm tươi ngon khiến mọi người có thể thưởng
          thức bữa ăn một cách dễ dàng và vui vẻ.
        </p>
        <CountDown />
        <Link href="/menu">
          <button className="bg-red-500 hover:bg-red-600 text-white rounded-md py-3 px-6">
            Đặt hàng ngay
          </button>
        </Link>
      </div>
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="/offerProduct.png"
          alt="offer"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Offer;
