import React, {ChangeEvent, useEffect, useState} from "react";
import styled from "@emotion/styled";
import uiCss from "../../styles/uiCss";
import {border, palette} from "../../styles/baseStyle";
import CartTable from "./components/CartTable";
import {getCartData} from "../../store/cartSelector";
import {useDispatch, useSelector} from "react-redux";
import {addProductCount, deleteAllProduct, deleteProduct, setAllProductSellYn, setProductSellYn} from "../../store/cartSlice";
import HeadComponent from "@/components/common/Head";
import StepBox from "./components/StepBox";
import textCss from "../../styles/textCss";
import Link from "next/link";
import CheckButton from "@/components/common/CheckButton";
import { synchronize } from "store/productsSlice";
import getData from "@/lib/getData";
import {API} from "../../config";

const CartPageContainer = styled.div`
  ${uiCss.flexColumn.custom('flex-start', 'center')}
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 300px;
  
  .step-box {
    display: flex;
    justify-content: center;
    grid-column-gap: 10px;
    min-width: 1024px;
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
    
    .manage-button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;

      button {
        width: 128px;
        height: 40px;
        ${textCss.gray15Medium};
        ${border.grayMedium};
        background-color: ${palette.gray.main};
        color: ${palette.common.white};
      }
      
      .delete-button-wrapper {
        display: flex;
        grid-column-gap: 10px;
        
        > button {
          background-color: ${palette.common.white};
          color: ${palette.gray.main};
        }
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
              min-width: 300px;

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
                
                > h1 {
                  display: block;
                  white-space: normal;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }

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
  
  .check-button-container {
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

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 20px;
  position: absolute;
  top: calc(50% - 300px);
  width: 500px;
  padding: 30px;
  background-color: ${palette.common.white};
  ${border.grayLightDD};

  .modal-title {
    padding-bottom: 20px;
    ${textCss.gray18Bold};
    font-family: Campton-Semi-Bold, sans-serif;
    border-bottom: ${border.grayLightDD.border};
  }
  
  .modal-contents {
    display: flex;
    flex-direction: column;
    grid-row-gap: 10px;
    height: 100%;
    
    > div {
      display: grid;
      align-items: center;
      grid-template-columns: 100px 1fr;
    }
    
    .coupon-box {
      width: 100%;


      .coupon-dropdown {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 45px;
        ${border.grayLightDD};

        ul {
          //display: none;
          position: absolute;
          top: 40px;
          left: -1px;
          flex-direction: column;
          width: 100.5%;
          background-color: ${palette.common.white};
          ${border.grayLightDD};
          border-top-style: none !important;
          ${textCss.gray12Medium};
          z-index: 1;

          li {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
          }
        }
      }
    }
    
    .mileage-input-wrapper {
      display: grid;
      grid-template-columns: 160px 80px 1fr;
      grid-column-gap: 10px;
      align-items: center;

      > input {
        height: 45px;
        ${border.grayLightDD};
      }
      
      > button {
        height: 45px;
        ${border.grayLightDD};
        ${textCss.gray13Medium};
        
        &:disabled {
          background-color: ${palette.gray.lightEE};

        }
      }

      span {
        display: flex;
        flex-direction: column;
        ${textCss.gray14Medium};

        p {
          ${textCss.gray14Bold};
        }
      }
    }
  }
`


const CartPage = () => {
  const { data: couponData, isLoading } = getData(`${API.COUPONS}`);
  const [selectedCoupon, setSelectedCoupon] = useState('사용가능 쿠폰')


  const dispatch = useDispatch();
  const cart = useSelector(getCartData);
  const { productList } = cart;
  const [totalAmounts, setTotalAmounts] = useState(0);

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

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(productList));
  }

  const handleDeleteALlProduct = () => {
    dispatch(deleteAllProduct());
  }

  const linkToProductsPage = () => {
    dispatch(synchronize(productList))
  }

  const calculateAmounts = (coupon: any) => {
    let totalAmount = 0;

    if (coupon) {
      const { type, discountAmount, discountRate } = coupon;

      for (let i in productList) {
        const { count, price, isSellYn, availableCoupon } = productList[i];
        const isAvailableCoupon = availableCoupon === undefined;

        // 선택되지 않은 상품은 계산하지 않는다.
        if (isSellYn) {
          // type 이 rate 이고, 쿠폰 적용이 가능한 상품이라면 discountRate 를 적용한다.
          const multiply = (discountRate && isAvailableCoupon) ? (1 - discountRate * 0.01) : 1;

          // 가격 * 개수 * 할인율 적용.
          totalAmount += (count as number * price * multiply);
        }
      }
      //type 이 amount 인 경우, discountAmount 만큼 가격을 뺀다.
      if (discountAmount) totalAmount -= discountAmount;
    }

    return totalAmount;
  }

  useEffect(() => {
    if (couponData) {
      // coupon 을 적용하지 않을 때에도 이 부분을 이용한다.
      const calculated = calculateAmounts(couponData[0]);

      setTotalAmounts(calculated);
    }
  },[productList]);

  const changeHandler = (e: any) => {
    const value = e.target.innerHTML;
    setSelectedCoupon(value);
  }

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <HeadComponent title='장바구니 페이지' name='cart' content='장바구니 페이지입니다.' />

      <CartPageContainer>
        <StepBox />
        <Modal>
          <p className='modal-title coupon'>쿠폰 / 마일리지</p>
          <div className='modal-contents'>
            <div className='coupon-box'>
              <p>쿠폰</p>

              <div
                className='coupon-dropdown'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div>{selectedCoupon}</div>
                {
                  showDropdown &&
                  <ul>
                    <li onClick={changeHandler}>쿠폰1</li>
                    <li onClick={changeHandler}>쿠폰2</li>
                  </ul>
                }

              </div>



            </div>
            <div className='mileage-box'>
              <p>마일리지</p>
              <div className='mileage-input-wrapper'>
                <input disabled={true} type='text'/>
                <button disabled={true}>모두 사용</button>
                <span>보유 마일리지&nbsp;<p>0p</p></span>
              </div>
            </div>
          </div>
        </Modal>

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
                <div className='manage-button-container'>
                  <div className='delete-button-wrapper'>
                    <button onClick={() => handleDeleteProduct()}>선택상품 삭제</button>
                    <button onClick={handleDeleteALlProduct}>전체상품 삭제</button>
                  </div>
                  <button>쿠폰 적용하기</button>
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
                    <td>{totalAmounts}원</td>
                    <td>+</td>
                    <td>0원</td>
                    <td>+</td>
                    <td>{totalAmounts}원</td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div className='check-button-container'>
                <Link className='link' href='products'>
                  <CheckButton
                    type='shopping'
                    text='CONTINUE SHOPPING'
                    callback={ linkToProductsPage }
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

export default CartPage;
