import React, {ChangeEvent, useEffect, useState} from "react";
import styled from "@emotion/styled";
import uiCss from "../../styles/uiCss";
import {border, palette} from "../../styles/baseStyle";
import CartTable from "./components/table/CartTable";
import {getCartData} from "../../store/cartSelector";
import {useDispatch, useSelector} from "react-redux";
import {
  addProductCount,
  deleteAllProduct,
  deleteProduct,
  initialize,
  setAllProductSellYn,
  setProductSellYn,
  setTotalAmounts
} from "../../store/cartSlice";
import HeadComponent from "@/components/common/Head";
import StepBox from "./components/StepBox";
import textCss from "../../styles/textCss";
import CheckButton from "@/components/common/CheckButton";
import { synchronize } from "store/productsSlice";
import getData from "@/lib/getData";
import {API} from "../../config";
import OrderTable from "./components/table/OrderTable";
import { useRouter } from "next/router";
import CouponModalContainer from "./components/couponModal/CartModalContainer";

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
      ${textCss.gray20Medium};
      font-size: 30px;
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
  
  .check-button-container {
    display: flex;
    grid-column-gap: 10px;
  }
`

const CartPage = () => {
  const { data: couponData, isLoading } = getData(`${API.COUPONS}`);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(getCartData);
  const { productList, coupon } = cart;

  const [showModal, setShowModal] = useState(false);
  const [amounts, setAmounts] = useState({
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
    // 카트 정보를 전달한다.
    // 쿠폰 할인 금액이 0 인 경우, 쿠폰 차감하지 않는다.
    // 지금은 초기화하고, products 페이지로 이동하는 것으로 한다.
    if (productList.every(product => !product.isSellYn)) {
      alert('선택된 상품이 없습니다.')
      return;
    }

    alert('상품 구매가 완료되었습니다.');
    await dispatch(initialize());
    router.push('/products').then();
  }

  const calculateAmounts = (coupon: any) => {
    let totalAmounts = 0;
    let totalAmountsOrigin = 0;

    const { type, discountAmount, discountRate } = coupon;
    const sellYnProductList = productList.filter(product => product.isSellYn);
    const isAllAvailableCoupon = !sellYnProductList.every(product => product.availableCoupon === false);

    for (let i in productList) {
      const { count, price, isSellYn, availableCoupon } = productList[i];
      const isAvailableCoupon = availableCoupon === undefined;

      // 선택되지 않은 상품은 계산하지 않는다.
      if (isSellYn) {
        // type 이 rate 이고, 쿠폰 적용이 가능한 상품이라면 discountRate 를 적용한다.
        const multiply = (discountRate && isAvailableCoupon) ? (1 - discountRate * 0.01) : 1;

        // 가격 * 개수 * 할인율 적용.
        totalAmounts += (count as number * price * multiply);
        totalAmountsOrigin += (count as number * price);
      }
    }
    //type 이 amount 인 경우, discountAmount 만큼 가격을 뺀다.
    if (discountAmount && isAllAvailableCoupon) totalAmounts -= discountAmount;

    return {
      totalAmounts,
      totalAmountsOrigin
    };
  }

  useEffect(() => {
    const { totalAmounts, totalAmountsOrigin } = calculateAmounts(coupon);

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

  if (!couponData) return <></>
  return (
    <>
      <HeadComponent title='장바구니 페이지' name='cart' content='장바구니 페이지입니다.' />
      <CartPageLayout>
        <StepBox />

        {
          showModal && (
            <CouponModalContainer modalData={modalData}/>
          )
        }

        {
          !productList.length ? (
            <div className='empty-cart'>
              <p>장바구니에 담은 상품이 없습니다.</p>
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
                    <button onClick={() => handleDeleteProduct()}>선택상품 삭제</button>
                    <button onClick={handleDeleteALlProduct}>전체상품 삭제</button>
                  </div>
                  <button onClick={() => setShowModal(true)}>쿠폰 적용하기</button>
                </div>
              </div>

              <div className='table-container'>
                <OrderTable
                  coupon={coupon}
                  amounts={amounts}
                />
              </div>

              <div className='check-button-container'>
                <CheckButton
                  type='white'
                  text='CONTINUE SHOPPING'
                  callback={ handleDispatchProductList }
                />
                <CheckButton
                  type='black'
                  text='CHECK OUT'
                  callback={ handleDispatchCart }
                />
              </div>
            </>
          )
        }
      </CartPageLayout>
    </>
  )
};

export default CartPage;
