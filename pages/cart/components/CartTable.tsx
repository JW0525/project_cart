import CheckBoxWrapper from "@/components/common/CheckBox";
import CartTableProducts from "./CartTableProducts";
import React from "react";
import {ProductState} from "../../../store/cartSlice";

const CartTable = (props: {
  productList: ProductState[];
  handleAddProduct: Function;
  handleAddAllProduct: Function;
  handleProductCount: Function;
}) => {
  const { productList, handleAddProduct, handleAddAllProduct, handleProductCount } = props;

  return (
    <table className='cart-table'>
      <thead>
      <tr>
        <td>
          <CheckBoxWrapper
            isChecked={productList.every(product => product.isSellYn)}
            callback={handleAddAllProduct}
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
        productList.map((product: any, idx: number) =>
          <tr key={idx}>
            <CartTableProducts
              product={product}
              handleClick={handleAddProduct}
              handleProductCount={handleProductCount}
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