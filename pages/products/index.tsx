import React, {ChangeEvent, ReactElement, useState} from "react";
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
import {addCartProducts, subtractCartProducts, } from "../../store/cartSlice";
import {ProductState} from "../../store/productsSlice";
import {getCartData} from "../../store/cartSelector";

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
      }
      
      .description-container {
        display: grid;
        grid-template-columns: 1fr 60px;
        height: 85px;
        padding: 10px 5px;
        
        .text-box {
          margin-right: 10px;
          h1 {
            padding-bottom: 10px;
            ${textCss.gray12Medium}
            color: #5d5d5d;
          }
          
          span {
            display: flex;
            
            p {
              ${textCss.gray14Bold}

              :nth-of-type(2) {
                padding-left: 2px;
                font-size: 12px;
                font-weight: 400;
              }
            }
          }
        }
        
        .cart-button-box {
          
          button {
            width: 30px;
            height: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
`

const ProductsPage: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getData(`${API.PRODUCTS}`);
  const dispatch = useDispatch();
  const cart = useSelector(getCartData)



  if (!data) return <></>

  const sortedData = data.sort(function(a: any,b: any) {
    return b.score - a.score;
  })

  const addCartHandler = (e: any) => {
    const clickedProductItemNo = Number(e.currentTarget.value);
    const clickedProduct: ProductState = data.find((e: any) => {
      return e.item_no === clickedProductItemNo
    });

    dispatch(addCartProducts({
      item_no: clickedProductItemNo,
      product: clickedProduct
    }));

  }

  const subtractCartHandler = (e: any) => {
    const clickedProductItemNo = Number(e.currentTarget.value);

    dispatch(subtractCartProducts({
      item_no: clickedProductItemNo,
    }));
  }

  console.log(cart);

  return (
    <>
      <Head>
        <title>상품 페이지</title>
        <meta name="products" content="상품 페이지입니다." />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>

      <ProductsPageContainer>
        <ul>
          {
            sortedData.map((e: any, idx: number) => {
              return (
                <li key={idx}>
                  <div className='image-wrapper'>
                    <img src={e.detail_image_url} />
                  </div>
                  <div className='description-container'>

                    <div className='info-box'>
                      <h1>{e.item_name}</h1>
                      <span>
                      <p>{NumberToCurrency(e.price)}</p>
                      <p>원</p>
                    </span>
                    </div>

                    <div className='cart-button-box'>
                      <button className='add-cart'
                              onClick={addCartHandler}
                              value={e.item_no}
                      >
                        +
                      </button>
                      <button className='subtract-cart'
                              onClick={subtractCartHandler}
                              value={e.item_no}
                      >
                        -
                      </button>
                    </div>

                  </div>
                </li>
              )
            })
          }
        </ul>
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
