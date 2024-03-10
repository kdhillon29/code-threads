import { FetchProducts } from "@/actions/getStripeProducts";
import Products from "@/components/Products";

const page = async () => {
  const products = await FetchProducts();
  return <Products allProducts={products} />;
};

export default page;
