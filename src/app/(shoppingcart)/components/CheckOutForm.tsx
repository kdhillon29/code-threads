"use client";
import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCheckOutStore } from "@/store/useCheckOutStore";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import formatPrice from "@/utils/formatPrice";
import { clear } from "console";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const checkoutStore = useCheckOutStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const { clearCart, totalPrice } = useShoppingCart();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  useEffect(() => {
    async function fetchLatestOrderId() {
      try {
        const response = await fetch("/api/orderid");
        const data = await response.json();
        setOrderId(data.orderId);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLatestOrderId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          checkoutStore.setCheckout("cart");

          fetch("/api/update-order-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: orderId,
              status: "payment successful",
            }),
          });
          setIsLoading(false);
          checkoutStore.setPaymentIntent("");
          toast.success("Payment Successful");
          clearCart();
          router.push("/");
        } else {
          console.error(result.error);
          setError(true);
          setIsLoading(false);

          toast.error("Payment unsucessful!try again");
        }
      });
  };

  return (
    <form className="text-gray-600" onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />
      <h1 className="py-4 text-sm font-bold">
        {totalPrice !== undefined ? formatPrice(totalPrice) : null}
      </h1>
      <Button
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
        type="submit"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-1 w-1 p-[5px] rounded-sm  mr-1  bg-slate-200"
              viewBox="0 0 20 20"
            ></svg>
            processing...
          </span>
        ) : (
          <span>Pay Now</span>
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;
