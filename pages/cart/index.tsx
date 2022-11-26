import React, {ChangeEvent, useEffect, useState} from "react";
import styled from "@emotion/styled";
import uiCss from "../../styles/uiCss";
import getData from "@/lib/getData";
import {API} from "../../config";
import {border} from "../../styles/baseStyle";
import {IProductData} from "../products";
import CartTable from "./components/CartTable";

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

              .info-wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 20px;

                > span {
                  display: flex;
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
  const [orderData, setOrderData] = useState<IProductData[]>([]);

  if (!productData) return <></>

  const test = productData[0];
  const test2 = productData[2];
  const test3 = productData[3];

  // 나중에 cartData 로 대체
  const array: any = [];
  array.push(test, test2, test3);



  // order 에 상품 추가하는 함수
  const addHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedProductItemNo = Number(e.currentTarget.value);
    const clickedProduct: IProductData = productData.find((e: any) => {
      return e.item_no === clickedProductItemNo
    });

    if (orderData.includes(clickedProduct)) {
      const newOrderData = orderData.filter((data: IProductData) => {
        return data.item_no !== clickedProductItemNo
      });
      setOrderData([...newOrderData]);
    } else {
      setOrderData([clickedProduct, ...orderData]);
    }
  };

  const addAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (array.length === orderData.length) {
      setOrderData([]);
    } else {
      setOrderData([...array]);
    }
  }

  return (
    <CartPageContainer>
      <CartTable
        array={array}
        orderData={orderData}
        addHandler={addHandler}
        addAllHandler={addAllHandler}
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
  )
};

export default CartPage
