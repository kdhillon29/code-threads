import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export const getOrders = async (user: any) => {
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
  });

  revalidatePath("/dashboard");
  return orders;
};
