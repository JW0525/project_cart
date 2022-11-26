import CheckBoxWrapper from "@/components/common/CheckBox";
import { NumberToCurrency } from "../../../utils/regExpression";
import React from "react";

const CartTableProducts = (props: {
  product: any;
  orderData: any;
  clickHandler: Function;
  countHandler: Function;
  idx: number;
}) => {
  const { product, orderData, clickHandler, countHandler, idx } = props;

  return (
    <>
      <td>
        <CheckBoxWrapper
          isChecked={orderData.includes(product)}
          callback={clickHandler}
          value={product.item_no}
        />
      </td>


      <td className='product-info'>
        <div className='image-wrapper'>
          <img src={product.detail_image_url} />
        </div>
        <div className='info-box'>
          <h1>{product.item_name}</h1>
          <span>
            <p>{NumberToCurrency(product.price)}</p>
            <p>원</p>
          </span>
        </div>
      </td>



      <td className='count'>
        <div
          className='button-box'
          onClick={(e) => countHandler(e)}
        >
          <button
            data-item={product.item_no}
            data-button-type={'subtract'}
          >
            +
          </button>
          <div>1</div>
          <button
            data-item={product.item_no}
            data-button-type={'add'}
          >
            +
          </button>
        </div>
      </td>





      <td>39,900원</td>
      <td>39,900원</td>
    </>
  )
}

export default CartTableProducts;