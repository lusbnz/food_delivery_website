"use client";

import AddressForm from "@/components/AddressForm";

const PayPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <AddressForm id={id} />
    </div>
  );
};

export default PayPage;
