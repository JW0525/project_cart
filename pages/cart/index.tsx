import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import uiCss from "../../styles/uiCss";
import getData from "@/lib/getData";
import {API} from "../../config";
import {border, palette} from "../../styles/baseStyle";
import CartTable from "./components/CartTable";
import Head from "next/head";
import {ProductState} from "../../store/productsSlice";




const CartPageContainer = styled.div`
  ${uiCss.flexColumn.center}
  width: 100%;
  height: 100vh;
    
  table {
    width: 100%;
    border-top: ${border.grayMain4x.border};
    border-bottom: ${border.grayMain.border};

    // cart table
    &.cart-table {
      thead {
        tr {
          display: grid;
          grid-template-columns: 60px 1fr 175px 175px 125px;
          align-items: center;
          height: 70px;

          td {
            display: flex;
            justify-content: center;
            align-items: center;         
          }
        }
      }
      
      tbody {
        tr {
          display: grid;
          grid-template-columns: 60px 1fr 175px 175px 125px;
          align-items: center;
          height: 175px;
          border-top: ${border.grayLightDD.border};

          td {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

            :nth-of-type(2), :nth-of-type(3), :nth-of-type(4) {
              border-right: ${border.grayLightDD.border};
            }

            &.product-info {
              display: grid;
              grid-template-columns: 120px 1fr;

              .image-wrapper {
                img {
                  width: 100%;
                  object-fit: cover;
                }
              }

              .info-box {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 20px;

                > span {
                  display: flex;
                }
              }
            }
            
            &.count {
              .button-box {
                display: grid;
                grid-template-columns: 30px 30px 30px;
                height: 30px;
                background-color: white;
                ${border.grayLightEE};

                > div, button {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding-top: 3px;
                  text-align: center;
                  background-color: ${palette.common.white};

                  :nth-of-type(1) {
                    border-right: ${border.grayLightEE.border};
                  }
                }

                button {
                  color: ${palette.gray.lightAA};
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    
    // order table
    &.order-table {
      thead {
        tr {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          height: 70px;

          td {
            text-align: center;
          }
        }
      }

      tbody {
        tr {
          display: grid;
          grid-template-columns: 1fr 20px 1fr 20px 1fr;
          align-items: center;
          height: 150px;
          border-top: ${border.grayLightDD.border};

          td {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
}`

const CartPage = () => {
  const { data: productData, isLoading, isError } = getData(`${API.PRODUCTS}`);
  const [orderData, setOrderData] = useState<ProductState[]>([]);
  const [productCount, setProductCount] = useState<any>([]);





  if (isLoading) return <></>


  const test = productData[0];
  const test2 = productData[2];
  const test3 = productData[3];

  // 나중에 cartData 로 대체
  const array: any = [];
  array.push(test, test2, test3);






  const productCountList: any = [];

  for (let i in array) {
    const { item_no } = array[i];
    productCountList.push({
      count: 1,
      item_no: item_no
    })
  }






  // order 에 상품 추가하는 함수
  const addProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedProductItemNo = Number(e.currentTarget.value);
    const clickedProduct: ProductState = productData.find((e: any) => {
      return e.item_no === clickedProductItemNo
    });

    if (orderData.includes(clickedProduct)) {
      const newOrderData = orderData.filter((data: ProductState) => {
        return data.item_no !== clickedProductItemNo
      });
      setOrderData([...newOrderData]);

    } else {
      setOrderData([clickedProduct, ...orderData]);
    }
  };



  // order 에 전체 상품 추가하는 함수
  const addAllProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (array.length === orderData.length) {
      setOrderData([]);
    } else {
      setOrderData([...array]);
    }
  }





  const countHandler = (e: React.MouseEvent)  => {
    const clickedProductItemNo = Number((e.target as HTMLSpanElement).getAttribute('data-item'));
    const buttonType = (e.target as HTMLSpanElement).getAttribute('data-button-type');
  }


  return (
    <>
      <Head>
        <title>장바구니 페이지</title>
        <meta name="cart" content="장바구니 페이지입니다." />
      </Head>

      <CartPageContainer>
        <CartTable
          array={array}
          orderData={orderData}
          addProductHandler={addProductHandler}
          addAllProductHandler={addAllProductHandler}
          countHandler={countHandler}
        />

        <table className='order-table'>
          <thead>
          <tr>
            <td>총 주문금액</td>
            <td>총 배송비</td>
            <td>총 결제금액</td>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>39,900원</td>
            <td>+</td>
            <td>39,900원</td>
            <td>+</td>
            <td>39,900원</td>
          </tr>
          </tbody>
        </table>

      </CartPageContainer>
    </>

  )
};

export default CartPage
