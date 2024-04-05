import Image from "next/image";

const Notification = () => {
  return (
    <div className="h-12 bg-red-500 text-white px-4 flex justify-center items-center text-center text-sm md:text-base cursor-pointer">
      Miễn phí giao hàng cho hóa đơn trên 300k. Đặt hàng ngay nào!
      <div className="flex-none right-0 absolute hidden md:block mr-4">
        <div className="flex items-center gap-2 cursor-pointer bg-orange-300 px-2 rounded-xl">
          <Image src="/phone.png" alt="phone" width={20} height={20} />
          <span>0353 580 848</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
