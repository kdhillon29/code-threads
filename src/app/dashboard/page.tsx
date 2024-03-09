import { getOrders } from "@/actions/getOrders";
import getCurrentUser from "../(auth)/actions/getCurrentUser";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import { RxAvatar } from "react-icons/rx";

const page = async () => {
  const user = await getCurrentUser();
  const orders = await getOrders(user);
  return (
    <>
      {user ? (
        <div className="main-container">
          <div className="py-2  mt-2 flex items-center justify-around  text-center bg-gray-400/80 text-white font-bold">
            <RxAvatar size={50} />
            <div>
              <p className="text-2xl">Hello, {user?.name}</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className=" w-full ">
            <h1 className="font-bold text-xl text-center underline my-2">
              Orders
            </h1>

            {orders?.length === 0 ? (
              <div>
                <h1>No Orders Placed</h1>
              </div>
            ) : (
              <div className=" flex flex-wrap  items-center justify-center gap-6">
                {orders?.map((order) => (
                  <div
                    key={order.id}
                    className=" w-1/3 max-sm:w-full p-2 rounded-lg  flex flex-col gap-1 items-center justify-center  bg-gray-200"
                  >
                    <h2 className="text-sm font-medium">
                      Order Number: {order.id.replaceAll(/\D/g, "")}
                    </h2>
                    <p className="text-sm my-2">Status: {order.status}</p>

                    <div className="text-sm lg:flex items-center gap-4">
                      {order.items.map((product) => (
                        <div key={product.id} className="py-2">
                          {product.image && (
                            <Image
                              src={product.image}
                              width={100}
                              height={100}
                              alt={`image for ${product.name}`}
                            />
                          )}

                          <h2 className="py-1">{product.name}</h2>
                          <span className="text-xs">{product.size}</span>
                          <div className="flex items-baseline gap-4">
                            <p>Quantity: {product.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="font-sm py-1 ">
                      Total: {formatPrice(order.amount)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center text-2xl uppercase">
          Please Sign In To View Orders
        </div>
      )}
    </>
  );
};

export default page;
