import CheckBoxWrapper from "@/components/common/CheckBox";
import CartTableProducts from "./CartTableProducts";
import React from "react";
import { ProductState } from "../../../store/productsSlice";

const CartTable = (props: {
  array: ProductState[];
  orderData: ProductState[];
  addProductHandler: Function;
  addAllProductHandler: Function;
  countHandler: Function;
}) => {
  const { array, orderData, addProductHandler, addAllProductHandler, countHandler } = props;

  return (
    <table className='cart-table'>
      <thead>
      <tr>
        <td>
          <CheckBoxWrapper
            isChecked={array.length === orderData.length}
            callback={addAllProductHandler}
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
              clickHandler={addProductHandler}
              countHandler={countHandler}
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