import React from "react";
import getData from "@/lib/getData";
import { API } from "../../config";
import styled from "@emotion/styled";
import { setResponsive } from "../../styles/setResponsive";

const ProductsPageContainer = styled.div`
  li {
    ${setResponsive({ flexBasis: ['33.3%', '25%', '20%'] })}
    ${setResponsive({ backgroundColor: ['yellow', 'white', 'green'] })}
  }
`

const ProductsPage = () => {
  const { data, isLoading, isError } = getData(`${API.PRODUCTS}`);
  console.log(data)

  return (
    <ProductsPageContainer>
      <ul>
        <li>Products</li>
        <li>Products</li>
        <li>Products</li>
      </ul>
    </ProductsPageContainer>
  )
};

export default ProductsPage;
