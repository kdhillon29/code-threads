"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { mainLinks } from "@/constants";
import { userLinks } from "@/constants";
import { User } from "@prisma/client";

//icons
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { TbBracketsAngle } from "react-icons/tb";
import CartIcon from "@/app/(shoppingcart)/components/ui/CartIcon";
import WishListIcon from "@/app/(wishlist)/components/WishListIcon";

interface NavbarProps {
  user: User | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const userMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };
  return (
    <nav className="sticky  top-0 left-0 right-0 z-50 bg-zinc-200">
      <div className="main-container border-b border-1 flex justify-between items-center py-2 relative">
        <Link href={"/"}>
          <div className="bg-logo-bg p-2 rounded-full flex gap-1  items-center  text-md font-medium text-black">
            <span className="">
              CODE-<span className="text-white">THREADS</span>
            </span>

            <TbBracketsAngle color="white" />
          </div>
        </Link>

        <ul className="flex gap-10 max-md:hidden">
          {mainLinks.map((link, index) => (
            <Link key={index} href={link.route}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>

        <div className="flex gap-5 text-xl [&>*]:cursor-pointer">
          <CartIcon />
          <WishListIcon />
          <div className="max-md:hidden" onClick={userMenuHandler}>
            <AiOutlineUser />
          </div>
          <div className="md:hidden" onClick={mobileMenuHandler}>
            {openMobileMenu ? <MdClose /> : <FiMenu />}
          </div>
        </div>

        {/* USER MENU */}
        {openUserMenu && (
          <div className="z-10 absolute flex flex-col  gap-12 right-0 top-[40px] w-28  bg-gray-500 shadow-md rounded-md p-4 text-white max-md:hidden text-center">
            {!user ? (
              <ul>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-in"}>
                  <li>Log In</li>
                </Link>
                <Link onClick={() => setOpenUserMenu(false)} href={"/sign-up"}>
                  <li>Sign Up</li>
                </Link>
              </ul>
            ) : (
              <ul>
                {userLinks.map((link, index) => (
                  <Link
                    onClick={() => setOpenUserMenu(false)}
                    key={index}
                    href={link.route}
                  >
                    <li>{link.label}</li>
                  </Link>
                ))}
                <li className="cursor-pointer" onClick={() => signOut()}>
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      {openMobileMenu && (
        <div className="md:hidden">
          <div className="absolute right-5 w-48 bg-gray-700 py-5 shadow-md rounded-md p-4 text-white text-center z-[99999]">
            <ul className="flex flex-col gap-5">
              {mainLinks.map((link, index) => (
                <Link key={index} href={link.route}>
                  <li>{link.label}</li>
                </Link>
              ))}
              {!user ? (
                <>
                  <Link href={"/sign-in"}>
                    <li>Log In</li>
                  </Link>
                  <Link href={"/sign-up"}>
                    <li>Sign Up</li>
                  </Link>
                </>
              ) : (
                <>
                  {userLinks.map((link, index) => (
                    <Link key={index} href={link.route}>
                      <li>{link.label}</li>
                    </Link>
                  ))}
                  <li className="cursor-pointer" onClick={() => signOut()}>
                    Sign Out
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
