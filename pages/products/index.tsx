import React from "react";
import getData from "@/lib/getData";
import {API} from "../../config";

const ProductsPage = () => {
  const { data, isLoading, isError } = getData(`${API.PRODUCTS}`);
  console.log(data)

  return (
    <div>
      Products
    </div>
  )
};

export default ProductsPage;
