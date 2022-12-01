import React from "react";
import styled from "@emotion/styled";
import { backgroundImages } from "../../../styles/baseStyle";
import textCss from "../../../styles/textCss";
import CouponAvailableBox from "@/components/atoms/couponAvailableBox";
import { NumberToCurrency } from "../../../utils/regExpression";

const DescriptionContainerLayout = styled.div`
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
`

const ProductDescriptionContainer = (props: {
  itemName: string;
  itemPrice: number;
  itemNumber: any;
  isAvailableCoupon: boolean;
  isListHavingProduct: boolean;
  addCartHandler: any;
}) => {
  const { itemName, itemPrice, itemNumber, isAvailableCoupon, isListHavingProduct, addCartHandler} = props;

  return (
    <DescriptionContainerLayout>
      <div className='info-box'>
        <h1>{itemName}</h1>
        <div>
          <p>{NumberToCurrency(itemPrice)}</p>
          {
            isAvailableCoupon && <CouponAvailableBox />
          }
        </div>
      </div>

      <button
        className={`${isListHavingProduct ? 'take-out-product' : 'add-product'}`}
        value={itemNumber}
        onClick={addCartHandler}
      />
    </DescriptionContainerLayout>
  )
}

export default ProductDescriptionContainer;