import React, {ReactElement, useState} from "react";
import getData from "@/lib/getData";
import { API } from "../../config";
import styled from "@emotion/styled";
import { setResponsive } from "../../styles/setResponsive";
import { NextPageWithLayout } from "../_app";
import SideBarLayout from "@/components/layout/sideBarLayout";
import textCss from "../../styles/textCss";
import { NumberToCurrency } from "../../utils/regExpression";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {initialize, ProductState } from "../../store/cartSlice";
import Link from "next/link";
import { addCartProducts } from "../../store/productsSlice";
import { getProductList } from "../../store/productsSelector";
import { backgroundImages, palette, radius } from "../../styles/baseStyle";
import CartAnimation from "@/components/common/Animation";
import HeadComponent from "@/components/common/Head";

const ProductsPageContainer = styled.div`
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
    
       // image width, height 비율 같게 하기 위해서 image 를 감싸준다.
      .image-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-width: 245px;
        padding-top: 100%;

        img {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .cart-animation {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
        }
        
        .background {
          position: absolute;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          
          pre {
            text-align: center;
            color:rgba(256, 256, 256, 0.8);
            font-size: 1rem;
            
            &.not-show {
              visibility: hidden;
            }
          }
        }
      }
      
      .description-container {
        display: grid;
        grid-template-columns: 1fr 30px;
        height: 85px;
        padding: 10px 5px;
        
        .info-box {
          margin-right: 10px;
          h1 {
            padding-bottom: 10px;
            ${textCss.gray12Medium}
            color: #5d5d5d;
          }
          
          div {
            display: flex;
            align-items: center;
            grid-column-gap: 5px;
            
            p {
              ${textCss.gray14Bold}
            }
            
            span {
              padding: 2px 4px;
              background-color: ${palette.gray.lightEE};
              ${radius.micro};
              ${textCss.gray12Medium}
            }
          }
        }
        
        button {
          width: 30px;
          height: 30px;
          cursor: pointer;
          background-color: transparent;
          
          &.add-product {
            ${backgroundImages.icon('add-to-cart.png')};
          }
          
          &.take-out-product {
            ${backgroundImages.icon('take-out-from-cart.png')};
          }
        }
      }
    }
  }
`

const ProductsPage: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getData(`${API.PRODUCTS}`);
  const dispatch = useDispatch();
  const productList = useSelector(getProductList);
  const [showAnimation, setShowAnimation] = useState(false);
  const [clickedProductItemNo, setClickedProductItemNo] = useState(0);

  if (isLoading) return <></>

  const sortedData = data.sort(function(a: any, b: any) {
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

  return (
    <>
      <HeadComponent title='상품 페이지' name='products' content='상품 페이지입니다.' />

      <ProductsPageContainer>
        <ul>
          {
            sortedData.map((product: ProductState, idx: number) => {
              const isClickedProduct = clickedProductItemNo === product.item_no;
              const isListHavingProduct = productList.some(item => item.item_no === product.item_no);

              // console.log(product)

              return (
                <li key={idx}>
                  <div className='image-wrapper'>
                    <img src={product.detail_image_url} />
                    {
                      (showAnimation && isClickedProduct)
                        && (
                        <CartAnimation />
                      )
                    }
                    {
                      (isListHavingProduct)
                       && (
                        <div className='background'>
                          <pre className={`${(showAnimation && isClickedProduct) && 'not-show'}`}>
                            상품이 장바구니에<br />등록되었습니다.
                          </pre>
                        </div>
                      )
                    }
                  </div>
                  <div className='description-container'>

                    <div className='info-box'>
                      <h1>{product.item_name}</h1>
                      <div>
                        <p>{NumberToCurrency(product.price)}</p>
                        {
                          (product.availableCoupon !== false) && <span>쿠폰 사용 가능</span>
                        }
                      </div>
                    </div>

                    <button
                      className={`${isListHavingProduct ? 'take-out-product' : 'add-product'}`}
                      value={product.item_no}
                      onClick={addCartHandler}
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>

        <Link href='cart'>
          <div onClick={() => dispatch(initialize(productList))}>
            장바구니로 이동
          </div>
        </Link>
      </ProductsPageContainer>
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
