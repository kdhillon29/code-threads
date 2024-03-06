import Hero from "@/components/Hero";
import Info from "@/components/Info";
import TopProducts from "@/components/TopProducts";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" ">
      <Hero />
      <Info />
      <TopProducts />
    </main>
  );
}
