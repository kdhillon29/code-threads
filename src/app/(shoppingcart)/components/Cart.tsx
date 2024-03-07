"use client";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useCheckOutStore } from "@/store/useCheckOutStore";
import CheckOut from "./CheckOut";
import Button from "@/components/ui/Button";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import formatPrice from "@/utils/formatPrice";

const Cart = () => {
  const { cartDetails, removeItem, totalPrice, decrementItem, incrementItem } =
    useShoppingCart();

  const checkoutStore = useCheckOutStore();

  const items = Object.values(cartDetails ?? {});
  return (
    <div className="py-20">
      <div className="main-container">
        {checkoutStore.onCheckout === "checkout" && (
          <button
            className="text-sm font-bold mb-5"
            onClick={() => checkoutStore.setCheckout("cart")}
          >
            &#8592; Back to cart
          </button>
        )}
        {items.length < 1 && checkoutStore.onCheckout === "cart" ? (
          <div className="h-screen flex items-center justify-center">
            <span className="text-2xl uppercase mb-20">
              Your cart is empty!
            </span>
          </div>
        ) : null}

        {checkoutStore.onCheckout === "cart" && (
          <ul className=" max-sm:w-full  w-2/3 mx-auto">
            {items.map((item) => (
              <li key={item.id} className="flex py-6 px-2 odd:bg-gray-200">
                <div className="h-24 w-24 flex justify-center items-center overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.image as string}
                    alt={`image of ${item.name}`}
                    width={100}
                    height={100}
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <div>
                        <h3>{item.name}</h3>
                        <h3 className="text-sm">Size:{item.size}</h3>
                      </div>
                      <p className="ml-4">{item.formattedValue}</p>
                    </div>
                  </div>
                  <div className="glex gap-5 mt-3">
                    <button
                      onClick={() =>
                        decrementItem(item.id, {
                          count: 1,
                        })
                      }
                    >
                      <FiMinus />
                    </button>
                    <button
                      onClick={() =>
                        incrementItem(item.id, {
                          count: 1,
                        })
                      }
                    >
                      <IoMdAdd />
                    </button>
                  </div>

                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">QTY: {item.quantity}</p>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-medium bg-zinc-300 p-1 rounded-md cursor-pointer hover:shadow-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {items.length > 0 && (
              <li className="border-t border-gray-200 w-full py-6 sm:px-6">
                <div className="flex w-full justify-between text-base font-medium text-gray-900 bg-zinc-100 p-2">
                  <p>Subtotal:</p>
                  <p>
                    {totalPrice !== undefined ? formatPrice(totalPrice) : null}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes are calcualted at checkout.
                </p>
                <div className="mt-6 w-full flex justify-center">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      checkoutStore.setCheckout("checkout");
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </li>
            )}
          </ul>
        )}

        {checkoutStore.onCheckout === "checkout" && (
          <CheckOut items={items} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
};

export default Cart;
