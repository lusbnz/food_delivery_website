"use client";

import Loading from "@/components/Loading";
import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [value, setValue] = useState('')

  if (status === "unauthenticated") {
    router.push("/");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetch(`/api/orders`).then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const remove = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
    // toast.success("The order status has been changed!");
  };

  const handleDelete = (id: string) => {
    remove.mutate({ id });
    // toast.success("The order has been removed!");
  };

  if (isLoading || status === "loading") return <Loading />;

  return (
    <div className="p-4 lg:px-20 xl:px-40 min-h-[calc(100vh-6rem)]">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Mã đơn hàng</th>
            <th>Ngày tạo đơn</th>
            <th>Giá</th>
            <th className="hidden md:block">Sản phẩm</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr
              className={`${item.status !== "delivered" && "bg-red-50"}`}
              key={item.id}
            >
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">
                {item.products[0].title}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    {/* <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    /> */}
                    <select
                      className="p-2 ring-1 ring-red-100 rounded-md"
                      // defaultValue={item.status}
                      // value={value}
                      onChange={(key: any) => setValue(key)}
                    >
                      <option value="not-paid">Chưa thanh toán</option>
                      <option value="paid">Đã thanh toán</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-red-400 p-2 rounded-xl text-white"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-400 p-2 rounded-xl text-white"
                    >
                      Xóa
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
