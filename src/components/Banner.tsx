import Image from "next/image";
import { FaArrowDownLong } from "react-icons/fa6";

const Banner = () => {
  return (
    <section className="main-container flex justify-center my-5 relative">
      <div className=" animate-slidein absolute top-0 left-0 w-1/2 h-full z-20 bg-zinc-900/90 text-5xl max-sm:text-xl border rounded-r-full text-white ">
        <p className="animate-text  bg-gradient-to-r from-amber-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-bold mt-4">
          Check Our New
          <br /> Arrivals!
        </p>
        <div className="animate-jumpInfinite pl-12 text-white">
          {" "}
          <FaArrowDownLong color="white" />
        </div>
      </div>
      <Image
        src={"/assets/banner-image.png"}
        layout="responsive"
        width={1400}
        height={500}
        alt="shirt banner"
      />
    </section>
  );
};

export default Banner;
