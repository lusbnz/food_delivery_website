"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface OptionWithPrice {
  title: string;
  additionalPrice: number;
}

const Price = ({ product }: { product: ProductType }) => {
  const optionsWithPrice = product.options as OptionWithPrice[];

  const [total, setTotal] = useState<number>(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(optionsWithPrice.length && {
        optionTitle: optionsWithPrice[selected].title,
      }),
      quantity: quantity,
    });
    // toast.success("The product added to the cart!");
  };

  useEffect(() => {
    const selectedOption = optionsWithPrice[selected];
    if (selectedOption) {
      const basePrice =
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price;
      const additionalPrice =
        typeof selectedOption.additionalPrice === "string"
          ? parseFloat(selectedOption.additionalPrice)
          : selectedOption.additionalPrice;
      const totalPrice = basePrice + additionalPrice;
      setTotal(quantity * totalPrice);
    }
  }, [quantity, selected, product, optionsWithPrice]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{total} VNĐ</h2>
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((item, index) => (
            <button
              key={item.title}
              className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-xl"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {item.title}
            </button>
          ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span className="font-bold">Số lượng</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="hover:font-bold"
            >
              {"<"}
            </button>
            <span className="font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 0))}
              className="hover:font-bold"
            >
              {">"}
            </button>
          </div>
        </div>
        <button
          className="uppercase w-72 bg-red-500 text-white p-3 ring-1 ring-red-500 hover:bg-red-600"
          onClick={handleCart}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default Price;
