import CheckBoxWrapper from "@/components/common/CheckBox";
import CartTableProducts from "./CartTableProducts";
import React from "react";
import {ProductState} from "../../../store/cartSlice";

const CartTable = (props: {
  products: ProductState[];
  handleAddProduct: Function;
  handleAddAllProduct: Function;
  handleProductCount: Function;
}) => {
  const { products, handleAddProduct, handleAddAllProduct, handleProductCount } = props;

  console.log(products);
  return (
    <table className='cart-table'>
      <thead>
      <tr>
        <td>
          <CheckBoxWrapper
            isChecked={products.every(product => product.isSellYn)}
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
        products.map((product: any, idx: number) =>
          <tr key={idx}>
            <CartTableProducts
              product={product}
              handleClick={handleAddProduct}
              handleCount={handleProductCount}
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