import styled from "@emotion/styled";
import React from "react";
import uiCss from "../../styles/uiCss";
import {setResponsive} from "../../styles/setResponsive";
import getData from "@/lib/getData";
import { API } from "../../config";
import { border } from "../../styles/baseStyle";
import {NumberToCurrency} from "../../utils/regExpression";

const CartPageContainer = styled.div`
  ${uiCss.flexColumn.center}
  width: 100%;
  height: 100vh;
    
  table {
    width: 100%;
    border-top: ${border.grayMain4x.border};
    border-bottom: ${border.grayMain.border};

    // cart table
    &.table-cart {
      thead {
        tr {
          display: grid;
          grid-template-columns: 60px 1fr 175px 175px 125px;
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
          }
        }
      }
    }
    
    // order table
    &.table-order {
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
  if (!productData) return <></>

  const test = productData[1];
  console.log(productData[1]);
  return (
    <CartPageContainer>





        <table className='table-cart'>
          <thead>
          <tr>
            <td>
              <div className='checkbox-wrapper'>2</div>
            </td>
            <td>상품 정보</td>
            <td>수량</td>
            <td>주문금액</td>
            <td>배송비</td>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>39,900원</td>
            <td  className='product-info'>
              <div className='image-wrapper'>
                <img src={test.detail_image_url} />
              </div>
              <div className='info-box'>
                <h1>{test.item_name}</h1>
                <span>
                <p>{NumberToCurrency(test.price)}</p>
                <p>원</p>
              </span>
              </div>
            </td>
            <td>39,900원</td>
            <td>+</td>
            <td>39,900원</td>
          </tr>
          </tbody>
        </table>

        <table className='table-order'>
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
