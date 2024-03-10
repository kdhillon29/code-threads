"use client";
import { useState } from "react";
import ProductsCard from "./ProductsCard";
import { ProductType } from "@/types/ProductTypes";

const Products: React.FC<{
  allProducts: ProductType[];
}> = ({ allProducts }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const [page, setPage] = useState(1);
  let totalProducts = allProducts.length;
  console.log("total products", totalProducts);

  let pageSize = 4;
  let totalPages = Math.ceil(totalProducts / pageSize);
  console.log("total pages", totalPages);
  let startProduct = page == 1 ? 1 : page * pageSize - pageSize + 1;
  let endProduct = startProduct + 4;
  if (page > totalPages) {
    setPage(1);
  }
  const sortProducts = () => {
    if (sortBy === "Price Low-High") {
      return allProducts
        .sort((a, b) => a.unit_amount - b.unit_amount)
        .slice(startProduct, endProduct);
    } else if (sortBy === "Price High-Low") {
      return allProducts
        .sort((a, b) => b.unit_amount - a.unit_amount)
        .slice(startProduct, endProduct);
    } else {
      return allProducts.slice(startProduct, endProduct);
    }
  };

  const sortedProducts = sortProducts();

  return (
    <section className="relative py-12 max-sm:py-4  ">
      <div className="main-container ">
        <div className=" w-full  flex justify-evenly items-center gap-16 mb-6">
          <span className=" font-semibold">
            Showing 1-12 of {allProducts.length} items
          </span>
          <div className=" w-1/2  ">
            <label className="font-semibold md:me-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className=" w-64 max-sm:w-32 md:mt-0 mt-1 py-2 px-3 h-10 bg-transparent rounded outline-none border border-gray-100 focus:ring-0"
            >
              <option value="">Select</option>
              <option value="Price Low-High">Price Low-High</option>
              <option value="Price High-Low">Price High-Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-2">
          {sortedProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
        <div className=" mt-12 w-1/2 ml-auto">
          <button
            onClick={() => setPage(1)}
            className="p-4 bg-slate-400 shadow-md border"
          >
            1
          </button>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="p-4 bg-slate-400 shadow-md border"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
