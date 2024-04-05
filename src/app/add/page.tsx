"use client";

import Loading from "@/components/Loading";
import { MenuType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [menu, setMenu] = useState<MenuType>([]);
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/categories`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch menu");
        }
        const data = await res.json();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file!);
      formData.append(
        "fileName",
        (Math.random() * 111111111111111111111111).toString()
      );
      const res = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization:
              "Basic cHJpdmF0ZV9XVEJvUWJseXI2L1IyTllNUGVGNVhNNmZwVE09Og==",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const resData = await res.json();
      return resData.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();

      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: url, ...inputs, options }),
      });

      const data = await res.json();
      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 lg:px-40 xl:px-80 xl:py-20 flex items-center justify-center text-red-500">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 font-bold border p-8 rounded-xl border-red-500"
      >
        <h1 className="text-4xl mb-2 text-red-500 mx-auto font-bold">
          Thêm sản phẩm mới
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-md cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <span>Tải lên ảnh sản phẩm</span>
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            className="text-sm"
            name="img"
            key="img"
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-md">Tên sản phẩm</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-xl outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            key="title"
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-md">Mô tả</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-xl outline-none"
            placeholder="Mô tả sản phẩm"
            name="desc"
            key="desc"
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="w-full flex flex-row gap-2">
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-md">Gía</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-xl outline-none"
              type="number"
              placeholder="29000 VNĐ"
              key="price"
              name="price"
              min={0}
              step={1000}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <label className="text-md">Menu</label>
            <select
              className="ring-1 ring-red-200 p-4 rounded-xl outline-none"
              key="catSlug"
              name="catSlug"
              onChange={handleChange}
            >
              <option disabled selected hidden>
                Chọn menu
              </option>
              {menu.map((item, index) => (
                <option key={index} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-md">Tùy chọn</label>
          <div className="flex">
            <select
              className="ring-1 ring-red-200 p-4 outline-none mr-2 rounded-xl"
              key="options.title"
              name="title"
              onChange={changeOption}
            >
              <option disabled selected hidden>
                Chọn kích thước
              </option>
              <option>Nhỏ</option>
              <option>Vừa</option>
              <option>Lớn</option>
            </select>
            <input
              className="ring-1 ring-red-200 p-4 outline-none rounded-l-xl"
              type="number"
              placeholder="Gía thêm"
              key="options.additionalPrice"
              name="additionalPrice"
              min={0}
              onChange={changeOption}
              required={true}
            />
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 p-2 text-white rounded-r-xl"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Thêm
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2  rounded-xl cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> ( + {opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 p-4 text-white w-32 rounded-xl relative h-14 flex items-center justify-center"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default AddPage;
