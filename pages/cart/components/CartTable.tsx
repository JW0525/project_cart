import CheckBoxWrapper from "@/components/common/CheckBox";
import CartTableProducts from "./CartTableProducts";
import React from "react";
import {IProductData} from "../../products";

const CartTable = (props: {
  array: IProductData[];
  orderData: IProductData[];
  addHandler: Function;
  addAllHandler: Function;
}) => {
  const { array, orderData, addHandler, addAllHandler } = props;

  return (
    <table className='cart-table'>
      <thead>
      <tr>
        <td>
          <CheckBoxWrapper
            isChecked={array.length === orderData.length}
            callback={addAllHandler}
          />
        </td>
        <td>상품 정보</td>
        <td>수량</td>
        <td>주문금액</td>
        <td>배송비</td>
      </tr>
      </thead>
      <tbody>
      {
        array!.map((product: any, idx: number) =>
          <tr key={idx}>
            <CartTableProducts
              product={product}
              orderData={orderData}
              clickHandler={addHandler}
              idx={idx}
            />
          </tr>
        )
      }
      </tbody>
    </table>
  )
}

export default CartTable;