import AddButton from "@/components/AddButton";
import { MenuType } from "@/types/types";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(`${process.env.URL_BACKEND}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const MenuPage = async () => {
  const menu: MenuType = await getData();

  return (
    <>
      {/* <AddButton /> */}
      <span className="hidden lg:flex justify-center items-center pt-12 underline cursor-pointer hover:font-bold">
        <Link href={`/menu/find-all`}>Tất cả sản phẩm</Link>
      </span>
      <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col gap-8 md:flex-row items-center">
        {menu.map((item) => (
          <Link
            href={`/menu/${item.slug}`}
            key={item.id}
            className="w-full h-1/3 bg-cover p-8 md:h-1/2 hover:scale-110 duration-300 rounded-3xl border border-gray-300"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className={`text-${item.color} w-1/2`}>
              <h1 className="uppercase font-bold text-3xl">{item.title}</h1>
              <p className="text-sm my-8">{item.desc}</p>
              <button
                className={`hidden 2xl:block bg-${item.color} text-white hover:opacity-75 py-2 px-4 rounded-xl`}
              >
                Khám phá
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MenuPage;
