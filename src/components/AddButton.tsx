"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AddButton = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }
  return (
    <Link href="/add">
      <button className="absolute mt-8 mr-2 right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl hidden md:block">
        Thêm mới
      </button>
    </Link>
  );
};

export default AddButton;
