import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import getCurrentUser from "./(auth)/actions/getCurrentUser";
import ToasterContext from "@/context/HotToastContext";
import CartContext from "@/context/CartContext";
import Footer from "@/components/Footer";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Tshirts Ecommerce",
  description: "t-shirt startup online store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={raleway.className}>
        <AuthContext>
          <CartContext>
            <ToasterContext />
            <Navbar user={user!} />
            <div className="min-h-[60vh]">{children} </div>
            <Footer />
          </CartContext>
        </AuthContext>
      </body>
    </html>
  );
}
