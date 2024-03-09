"use client";

import { useWishlistStore } from "@/store/useWishListStore";
import Image from "next/image";
import AddToCart from "@/app/(shoppingcart)/components/ui/AddToCart";
import { useState } from "react";
import toast from "react-hot-toast";
const Page = () => {
  const wishlistStore = useWishlistStore();
  const [selectedSize, setSelectedSize] = useState("");
  const showToast = () => {
    toast.error("Please choose a size first");
  };

  const isSizeSelected = selectedSize !== "";
  return (
    <div className="py-20">
      <div className="main-container">
        {wishlistStore.wishList.length > 0 ? (
          <>
            <span className="font-bold">
              You have {wishlistStore.wishList.length} items in your wishlist
            </span>
            <div className="flex flex-wrap gap-10 max-md:justify-center">
              {wishlistStore.wishList.map((product) => (
                <div key={product.id}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                  <h1 className="font-bold">{product.name}</h1>
                  <p>Price:{product.unit_amount}</p>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="my-2 p-2 border rounded-md"
                  >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                  <div className="flex gap-3">
                    <AddToCart
                      name={product.name}
                      image={product.image}
                      price={product.unit_amount}
                      id={product.price_id!}
                      size={selectedSize}
                      onClick={!isSizeSelected ? showToast : undefined}
                      currency="USD"
                    />
                    <button
                      onClick={() =>
                        wishlistStore.removeFromWishlist({
                          ...product,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full  flex justify-center items-center">
            <h1 className="font-bold text-xl">Your Wishlist is empty</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
