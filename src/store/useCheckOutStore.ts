import { create } from "zustand";
import { persist } from "zustand/middleware";

type CheckoutState = {
  paymentIntent: string;
  onCheckout: string;
  setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
};

export const useCheckOutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      //Initial State
      paymentIntent: "",
      onCheckout: "cart",

      //Set State
      setPaymentIntent: (val) => set((set) => ({ paymentIntent: val })),
      setCheckout: (val) => set((set) => ({ onCheckout: val })),
    }),
    { name: "checkout-store" }
  )
);
