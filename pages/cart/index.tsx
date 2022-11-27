import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import uiCss from "../../styles/uiCss";
import {border, palette} from "../../styles/baseStyle";
import CartTable from "./components/CartTable";
import {getCartData} from "../../store/cartSelector";
import {useDispatch, useSelector} from "react-redux";
import {addProductCount, setAllProductSellYn, setProductSellYn} from "../../store/cartSlice";
import HeadComponent from "@/components/common/Head";
import StepBox from "./components/StepBox";
import textCss from "../../styles/textCss";
import Link from "next/link";
import CheckButton from "@/components/common/CheckButton";

const CartPageContainer = styled.div`
  ${uiCss.flexColumn.custom('flex-start', 'center')}
  width: 100%;
  height: 100%;
  margin-bottom: 300px;
  
  .step-box {
    display: flex;
    grid-column-gap: 10px;
    padding: 10px 0 90px;
    
    p {
      font-family: Campton-Medium, sans-serif;
      color: ${palette.gray.lightDD};
      
      &.selected {
        color: ${palette.gray.main};
      }
    }
  }
  
  .empty-cart {
    ${uiCss.flexColumn.center};
    grid-row-gap: 50px;
    width: 100%;
    padding: 100px 0;
    border-top: ${border.grayMain4x.border};
    border-bottom: ${border.grayMain.border};
    
    p {
      ${textCss.gray20Medium};
      font-size: 32px;
    }
  }
  
  .table-container {
    width: 100%;
    margin-bottom: 150px;
    
    .delete-btn-box {
      margin-top: 30px;
      
      .button-wrapper {
        display: flex;
        grid-column-gap: 10px;
      }
      
      button {
        width: 128px;
        height: 40px;
        ${textCss.gray15Medium};
        ${border.grayMedium};
      }
    }
  }
  
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
  
  .button-container {
    display: flex;
    grid-column-gap: 10px;
    
     button {
       &.check-out {
         background-color: ${palette.common.black};
         color: ${palette.common.white};
       }
    }
  }
`

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(getCartData);
  const { productList } = cart;

  const handleAddProduct = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedProductItemNo = Number(e.currentTarget.value);
    dispatch(setProductSellYn(clickedProductItemNo));
  };

  const handleAddAllProduct = () => {
    dispatch(setAllProductSellYn());
  }

  const handleProductCount = (e: React.MouseEvent)  => {
    const clickedProductItemNo = Number((e.target as HTMLSpanElement).getAttribute('data-item'));
    const buttonType = (e.target as HTMLSpanElement).getAttribute('data-button-type');

    dispatch(addProductCount({
      item_no: clickedProductItemNo,
      type: buttonType
    }))
  }

  return (
    <>
      <HeadComponent title='장바구니 페이지' name='cart' content='장바구니 페이지입니다.' />

      <CartPageContainer>
        <StepBox />

        {
          !productList.length ? (
            <div className='empty-cart'>
              <p>장바구니에 담은 상품이 없습니다.</p>
              <Link className='link' href='products'>
                <CheckButton
                  type='shopping'
                  text='CONTINUE SHOPPING'
                />
              </Link>
            </div>
          ) : (
            <>
              <div className='table-container'>
                <CartTable
                  productList={productList}
                  handleAddProduct={handleAddProduct}
                  handleAddAllProduct={handleAddAllProduct}
                  handleProductCount={handleProductCount}
                />
                <div className='delete-btn-box'>
                  <div className='button-wrapper'>
                    <button>선택상품 삭제</button>
                    <button>전체상품 삭제</button>
                  </div>
                </div>
              </div>

              <div className='table-container'>
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
              </div>

              <div className='button-container'>
                <Link className='link' href='products'>
                  <CheckButton
                    type='shopping'
                    text='CONTINUE SHOPPING'
                  />
                </Link>
                <Link className='link' href='products'>
                  <CheckButton
                    type='check-out'
                    text='CHECK OUT'
                  />
                </Link>
              </div>
            </>
          )
        }
      </CartPageContainer>
    </>
  )
};

export default CartPage
