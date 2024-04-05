"use client";

import Loading from "@/components/Loading";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Xin chào</h1>
          <p>Đăng nhập vào tài khoản của bạn hoặc tạo tài khoản mới</p>
          <button
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
            onClick={() => signIn("google")}
            // onClick={() => signIn("facebook")}
          >
            <span>Đăng nhập</span>
          </button>
          <p className="text-sm">
            Có lỗi xảy ra?
            <Link className="underline" href="/">
              Liên hệ chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
