import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { useWishlistStore } from "@/store/useWishListStore";
const WishlistIcon = () => {
  const wishlistStore = useWishlistStore();

  return (
    <Link
      href={"/wishlist"}
      className={`${wishlistStore.wishList.length > 0 ? "text-red-700" : null}`}
    >
      <div className="relative hover:animate-bounce">
        <AiOutlineHeart size={20} />
        {wishlistStore.wishList.length > 0 && (
          <span className="absolute top-[-10px] right-[-5px] font-bold px-1  text-white text-xs bg-gray-600 rounded-full">
            {wishlistStore.wishList.length}
          </span>
        )}
      </div>
    </Link>
  );
};

export default WishlistIcon;
