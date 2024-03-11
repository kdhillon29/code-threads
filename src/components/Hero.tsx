"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="mt-2">
      <div className="main-container h-[50vh] max-sm:h-[20vh]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          speed={300}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          className="h-full w-full"
        >
          <SwiperSlide>
            <Image
              src="/assets/slider-image-1.png"
              layout="responsive"
              width={100}
              height={100}
              className="h-full w-full object-cover"
              unoptimized
              alt="banner img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={100}
              height={100}
              layout="responsive"
              src="/assets/slider-image-2.png"
              className="h-full w-full object-cover"
              unoptimized
              alt="banner Img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full  w-full">
              <div className="absolute  py-4 px-6 border-r-2 border-r-amber-200 rounded-r-full top-0 left-0 w-3/5 h-full bg-gray-600/90 z-10">
                <p className=" animate-wiggle text-4xl max-sm:text-2xl mt-12 max-sm:mt-4 text-pretty  text-white font-bold">
                  Online Sale!
                  <br />
                  <span className="text-amber-300"> 50% Off Store Wide. </span>
                </p>
              </div>
              <Image
                width={100}
                height={100}
                layout="responsive"
                src="/assets/contact.jpg"
                className=" h-full w-full object-cover bg-center"
                unoptimized
                alt="banner Img"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
