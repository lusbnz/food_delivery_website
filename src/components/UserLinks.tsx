"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const data = useSession();
  return (
    <div className="flex items-center">
      {data.status === "authenticated" ? (
        <div className="flex items-center">
          <span className="font-bold hidden lg:block px-2 mr-2 cursor-pointer text-blue-900">
            {data.data.user.name}
          </span>
          <Link href="/orders" className="hover:text-blue-900 px-2 mr-2">
            Đơn hàng
          </Link>
          <span
            className="hover:text-blue-900 px-2 mr-2 cursor-pointer"
            onClick={() => signOut()}
          >
            Đăng xuất
          </span>
        </div>
      ) : (
        <Link href="/login" className="hover:text-blue-900 mr-2 cursor-pointer">
          Đăng nhập
        </Link>
      )}
    </div>
  );
};

export default UserLinks;
