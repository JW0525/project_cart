import CheckBoxWrapper from "@/components/common/CheckBox";
import { NumberToCurrency } from "../../../utils/regExpression";
import React from "react";
import {ProductState} from "../../../store/productsSlice";
import CouponAvailableBox from "@/components/atoms/couponAvailableBox";

const CartTableProduct = (props: {
  product: ProductState;
  handleClick: Function;
  handleProductCount: Function;
  idx: number;
}) => {
  const { product, handleClick, handleProductCount, idx } = props;

  return (
    <>
      <td>
        <CheckBoxWrapper
          isChecked={product.isSellYn}
          callback={handleClick}
          value={product.item_no}
        />
      </td>

      <td className='product-info'>
        <div className='image-wrapper'>
          <img src={product.detail_image_url} />
        </div>
        <div className='info-box'>
          <div>
            <h1>{product.item_name}</h1>
            <CouponAvailableBox />
          </div>
          <div>
            <h6>{NumberToCurrency(product.price)}</h6>
            <p>원</p>
          </div>
        </div>
      </td>

      <td className='count'>
        <div
          className='button-box'
          onClick={(e) => handleProductCount(e)}
        >
          <button data-item={product.item_no}data-button-type={'subtract'}>-</button>
          <div>{product.count}</div>
          <button data-item={product.item_no} data-button-type={'add'}>+</button>
        </div>
      </td>

      <td>{NumberToCurrency(product.price * product.count!)}</td>
      <td>조건부 무료 배송</td>
    </>
  )
}

export default CartTableProduct;