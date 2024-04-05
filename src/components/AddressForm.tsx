import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const CheckoutForm = (id: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) return;

    const { error: submitError }: any = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const res = await fetch(
      `${process.env.URL_BACKEND}/api/create-intent/${id}`,
      {
        method: "POST",
      }
    );
    const { client_secret: clientSecret } = await res.json();

    const { error }: any = await stripe?.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.URL_BACKEND}/success`,
      },
    });

    if (error) setErrorMessage(error.message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[calc(100vh-12rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
    >
      <PaymentElement />
      <button
        disabled={!stripe || !elements}
        type="submit"
        className="bg-red-500 text-white p-4 rounded-md w-40 mt-8 hover:bg-red-600"
      >
        Thanh toán
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51Oxi0VRvSGadRwV6GPbEHo6RHwbwcjhxczF9EPq95wtaOesjqVVo7Tpw703MGKZ9VsT1Jf6j55BYBneFtHYR8SZl00bKpCdO2W"
);

const options: any = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  appearance: {
    theme: "stripe",
  },
};

const AddressForm = (id: any) => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm id={id} />
  </Elements>
);

export default AddressForm;
