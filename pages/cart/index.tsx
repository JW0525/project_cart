import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { API } from "../../config";
import { synchronize } from "store/productsSlice";
import { getCartData } from "../../store/cartSelector";
import {
  addProductCount, CouponState,
  deleteAllProduct,
  deleteProduct,
  initialize,
  setAllProductSellYn,
  setProductSellYn,
  setTotalAmounts
} from "../../store/cartSlice";
import styled from "@emotion/styled";
import uiCss from "../../styles/uiCss";
import { border, palette } from "../../styles/baseStyle";
import textCss from "../../styles/textCss";
import getData from "@/lib/getData";
import CheckButton from "@/components/common/CheckButton";
import CartTable from "./components/table/CartTable";
import CouponModalContainer from "./components/couponModal/CartModalContainer";
import HeadComponent from "@/components/common/Head";
import OrderTable from "./components/table/OrderTable";
import StepBox from "./components/StepBox";
import CheckButtonBox from "./components/CheckButtonContainer";

const CartPageLayout = styled.div`
  ${uiCss.flexColumn.custom('flex-start', 'center')}
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 300px;
  
  .empty-cart {
    ${uiCss.flexColumn.center};
    grid-row-gap: 50px;
    width: 100%;
    padding: 100px 0;
    border-top: ${border.grayMain4x.border};
    border-bottom: ${border.grayMain.border};
    
    p {
      ${textCss.gray30Medium};
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
        min-width: 128px;
        height: 40px;
        ${textCss.gray15Medium};
        background-color: ${palette.gray.main};
        ${border.grayMedium};
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
`

export interface IAmounts {
  totalAmounts: number,
  totalAmountsOrigin: number
}

const CartPage = () => {
  const { data: couponData, isLoading } = getData(`${API.COUPONS}`);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(getCartData);
  const { productList, coupon } = cart;

  const [showModal, setShowModal] = useState(false);
  const [amounts, setAmounts] = useState<IAmounts>({
    totalAmounts: 0,
    totalAmountsOrigin: 0
  });

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

  const handleDispatchProductList = () => {
    dispatch(synchronize(productList))
    router.push('/products').then();
  }

  const handleDispatchCart = async () => {
    // ?????? ????????? ????????????.
    // ?????? ?????? ????????? 0 ??? ??????, ?????? ???????????? ?????????.
    // ????????? ???????????????, products ???????????? ???????????? ????????? ??????.
    if (productList.every(product => !product.isSellYn)) {
      alert('????????? ????????? ????????????.')
      return;
    }

    alert('?????? ????????? ?????????????????????.');
    await dispatch(initialize());
    router.push('/products').then();
  }

  const calculateAmounts = (coupon: CouponState) => {
    let totalAmounts = 0;
    let totalAmountsOrigin = 0;

    const { type, discountAmount, discountRate } = coupon;
    const sellYnProductList = productList.filter(product => product.isSellYn);
    const isAllAvailableCoupon = !sellYnProductList.every(product => product.availableCoupon === false);

    for (let i in productList) {
      const { count, price, isSellYn, availableCoupon } = productList[i];
      const isAvailableCoupon = availableCoupon === undefined;

      // ???????????? ?????? ????????? ???????????? ?????????.
      if (isSellYn) {
        // type ??? rate ??????, ?????? ????????? ????????? ??????????????? discountRate ??? ????????????.
        const multiply = (discountRate && isAvailableCoupon) ? (1 - discountRate * 0.01) : 1;

        // ?????? * ?????? * ????????? ??????.
        totalAmounts += (count as number * price * multiply);
        totalAmountsOrigin += (count as number * price);
      }
    }
    //type ??? amount ??? ??????, discountAmount ?????? ????????? ??????.
    if (discountAmount && isAllAvailableCoupon) totalAmounts -= discountAmount;

    return {
      totalAmounts,
      totalAmountsOrigin
    };
  }

  useEffect(() => {
    const { totalAmounts, totalAmountsOrigin } = calculateAmounts(coupon as CouponState);

    setAmounts({ totalAmounts, totalAmountsOrigin });
  },[productList, coupon]);

  useEffect(() => {
    dispatch(setTotalAmounts(amounts.totalAmounts));
  },[amounts]);

  const modalData = () => {
    return {
      selectedCoupon: coupon,
      couponData,
      productList,
      setShowModal
    }
  }

  return (
    <>
      <HeadComponent title='???????????? ?????????' name='cart' content='???????????? ??????????????????.' />
      <CartPageLayout>
        <StepBox />
        {
          showModal && <CouponModalContainer modalData={modalData}/>
        }
        {
          !productList.length ? (
            <div className='empty-cart'>
              <p>??????????????? ?????? ????????? ????????????.</p>
              <CheckButton
                type='white'
                text='CONTINUE SHOPPING'
                callback={() => router.push('/products').then}
              />
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
                    <button onClick={() => handleDeleteProduct()}>???????????? ??????</button>
                    <button onClick={handleDeleteALlProduct}>???????????? ??????</button>
                  </div>
                  <button onClick={() => setShowModal(true)}>?????? ????????????</button>
                </div>
              </div>

              <div className='table-container'>
                <OrderTable
                  coupon={coupon}
                  amounts={amounts}
                />
              </div>

              <CheckButtonBox
                handleDispatchCart={handleDispatchCart}
                handleDispatchProductList={handleDispatchProductList}
              />
            </>
          )
        }
      </CartPageLayout>
    </>
  )
};

export default CartPage;
