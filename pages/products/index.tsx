import React, {ReactElement, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../config";
import getData from "@/lib/getData";
import { setProductList, ProductState } from "../../store/cartSlice";
import { addCartProducts } from "../../store/productsSlice";
import { getProductList } from "../../store/productsSelector";
import { NextPageWithLayout } from "../_app";
import styled from "@emotion/styled";
import { setResponsive } from "../../styles/setResponsive";
import HeadComponent from "@/components/common/Head";
import SideBarLayout from "@/components/layout/sideBarLayout";
import ProductImageWrapper from "./components/ProductImageWrapper";
import ProductDescriptionContainer from "./components/ProductDescriptionContainer";
import Pagination from "./components/Pagination";
import LoadingBar from "@/components/common/LoadingBar";

const ProductsPageLayout = styled.div`
  width: 100%;
  margin-left: 300px;
  
  ul {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;

    li {
      display: grid;
      ${setResponsive({
        flexBasis: ['100%', '47%', '30%'],
      })}
    }
  }
`

const ProductsPage: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getData(`${API.PRODUCTS}`);
  const dispatch = useDispatch();
  const productList = useSelector(getProductList);
  const [showAnimation, setShowAnimation] = useState(false);
  const [clickedProductItemNo, setClickedProductItemNo] = useState(0);

  const [limit, setLimit] = useState(6); // 한번에 보여줄 상품 수
  const [page, setPage] = useState(1); // 현재 페이지
  const offset = (page - 1) * limit;

  const sortedData = data && data.sort(function(a: any, b: any) {
    return b.score - a.score;
  })


  const addCartHandler = async (e: any) => {
    const clickedProductItemNo = Number(e.currentTarget.value);
    const clickedProduct: ProductState = data.find((e: any) => {
      return e.item_no === clickedProductItemNo
    });

    setClickedProductItemNo(clickedProductItemNo);
    setShowAnimation(false);

    await dispatch(addCartProducts({
      item_no: clickedProductItemNo,
      product: clickedProduct
    }));

    // 리스트에 상품이 추가되지 않았다면 상품추가 애니메이션을 보여준다.
    if (productList.length !== 3 && !productList.includes(clickedProduct)) {
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
    }
  }

  useEffect(() => {
    dispatch(setProductList(productList));
  },[productList]);

  if (isLoading) return (
    <ProductsPageLayout>
      <LoadingBar
        left={300}
      />
    </ProductsPageLayout>
  )
  return (
    <>
      <HeadComponent title='상품 페이지' name='products' content='상품 페이지입니다.' />
      <ProductsPageLayout>
        <ul>
          {
            sortedData.slice(offset, offset + limit).map((product: ProductState, idx: number) => {
              const isClickedProduct = clickedProductItemNo === product.item_no;
              const isListHavingProduct = productList.some((item: ProductState) =>
                item.item_no === product.item_no
              );

              return (
                <li key={idx}>
                  <ProductImageWrapper
                    imgUrl={product.detail_image_url}
                    isShowAnimation={showAnimation && isClickedProduct}
                    isListHavingProduct={isListHavingProduct}
                  />
                  <ProductDescriptionContainer
                    itemName={product.item_name}
                    itemPrice={product.price}
                    itemNumber={product.item_no}
                    isAvailableCoupon={product.availableCoupon !== false}
                    isListHavingProduct={isListHavingProduct}
                    addCartHandler={addCartHandler}
                  />
                </li>
              )
            })
          }
        </ul>
        <Pagination
          total={sortedData?.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </ProductsPageLayout>
    </>
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
