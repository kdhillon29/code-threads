"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCheckOutStore } from "@/store/useCheckOutStore";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "./CheckOutForm";
import { CartEntry as ICartEntry } from "use-shopping-cart/core";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = ({
  items,
  totalPrice,
}: {
  totalPrice: number | undefined;
  items: ICartEntry[];
}) => {
  const router = useRouter();
  const checkoutStore = useCheckOutStore();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items,
            payment_intent_id: checkoutStore.paymentIntent,
            totalAmount: totalPrice,
          }),
        });
        if (response.status === 403) {
          toast.error("Please Sign In");
          router.push("/sign-in");
          checkoutStore.setCheckout("cart");
          return;
        }

        if (!response.ok) {
          throw new Error("network issues");
        }

        const data = await response.json();
        if (data && data.paymentIntent) {
          setClientSecret(data.paymentIntent.client_secret);
          checkoutStore.setPaymentIntent(data.paymentIntent.id);
        } else {
          console.error("unexpected data structure", data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    createOrder();
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  return (
    clientSecret && (
      <Suspense fallback="loading...">
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      </Suspense>
    )
  );
};

export default Checkout;
