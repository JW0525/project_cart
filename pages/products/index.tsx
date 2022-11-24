import React, {ReactElement} from "react";
import getData from "@/lib/getData";
import { API } from "../../config";
import styled from "@emotion/styled";
import { setResponsive } from "../../styles/setResponsive";
import { NextPageWithLayout } from "../_app";
import SideBarLayout from "@/components/sideBarLayout";

const ProductsPageContainer = styled.div`
  margin-left: 300px;
  width: 100%;
  background-color: cornflowerblue;
  
  ul {
    display: flex;
    flex-flow: row wrap;

    li {
      min-width: 245px;
      display: flex;
      justify-content: center;
      ${setResponsive({ flexBasis: ['100%', '50%', '33.3%'], backgroundColor: ['green', 'white', 'yellow'] })}
    }
  }
`

const ProductsPage: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getData(`${API.PRODUCTS}`);
  console.log(data)

  return (
    <ProductsPageContainer>
      <ul>

        <li>Products</li>
        <li>Products</li>
        <li>Products</li>
        <li>Products</li>
        <li>Products</li>
      </ul>
    </ProductsPageContainer>
  )
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <SideBarLayout> {/* 중첩할 nested layout */}
       { page }
      </SideBarLayout>
    </>
  );
};

export default ProductsPage;
