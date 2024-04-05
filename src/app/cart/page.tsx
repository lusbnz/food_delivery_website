"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removingItems, removeFromCart } =
    useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch(`/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Chưa thanh toán!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-y-hidden lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {products.map((item) => (
          <div
            className="flex items-center justify-between mb-4 border p-4 rounded-xl border-separate border-red-500 hover:bg-fuchsia-100"
            key={item.id}
          >
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className="uppercase text-xl font-bold">
                {item.title} x {item.quantity}
              </h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className="font-bold">{item.price} VNĐ</h2>
            <span
              className="cursor-pointer hover:font-bold"
              onClick={() => !removingItems && removeFromCart(item)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div className="h-1/2 p-4 bg-fuchsia-100 flex flex-col gap-4 justify-center lg:h-full lg:w-1/2 lg:px-10 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="font-bold">Tổng cộng ({totalItems} sản phẩm)</span>
          <span className="">{totalPrice} VNĐ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Phí phục vụ</span>
          <span className="">0.00 VNĐ</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Phí vận chuyển</span>
          <span className="text-green-500">MIỄN PHÍ!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="font-bold">Tổng hóa đơn (Bao gồm thuế VAT)</span>
          <span className="font-bold">{totalPrice} VNĐ</span>
        </div>
        <button
          className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end hover:bg-red-600"
          onClick={handleCheckout}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartPage;
