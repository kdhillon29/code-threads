import { BiWorld } from "react-icons/bi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { GiTrophy } from "react-icons/gi";

const Info = () => {
  return (
    <section className="mt-2 py-5 ">
      <div className="main-container grid grid-cols-2  md:grid-cols-4  gap-6">
        <div className="flex items-center gap-2 uppercase text-sm max-sm:text-xs">
          <BiWorld className="text-3xl" />
          <span>Free Shipping Worldwide</span>
        </div>
        <div className="flex items-center gap-2 uppercase text-sm max-sm:text-xs">
          <FaArrowRotateLeft className="text-3xl" />
          <span>Money Back Guarenteed</span>
        </div>
        <div className="flex items-center gap-2 uppercase text-sm max-sm:text-xs">
          <IoIosLock className="text-3xl" />
          <span>Secure Online Payments</span>
        </div>
        <div className="flex items-center gap-2 uppercase text-sm max-sm:text-xs">
          <GiTrophy className="text-3xl" />
          <span>Best Premium Quality</span>
        </div>
      </div>
    </section>
  );
};

export default Info;
