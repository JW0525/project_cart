import React from "react";
import { ProductState } from "../../../../store/cartSlice";
import styled from "@emotion/styled";
import { border, palette } from "../../../../styles/baseStyle";
import textCss from "../../../../styles/textCss";
import CheckBoxWrapper from "@/components/common/CheckBox";
import CartTableProduct from "./CartTableProduct";

const CartTableContainer = styled.table`
  width: 100%;
  border-top: ${border.grayMain4x.border};
  border-bottom: ${border.grayMain.border};
  
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
        min-width: 60px;

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
            grid-row-gap: 5px;
            padding: 20px;

            > div {
              display: flex;
              align-items: center;
              grid-column-gap: 5px;

              h1 {
                display: block;
                white-space: normal;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-family: Campton-Semi-Bold, sans-serif;
                font-size: 20px;
                overflow: hidden;
              }
              
              h6 {
                font-family: Campton-Semi-Bold, sans-serif;
              }
              
              p {
                ${textCss.gray14Medium}
              }
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
`

const CartTable = (props: {
  productList: ProductState[];
  handleAddProduct: Function;
  handleAddAllProduct: Function;
  handleProductCount: Function;
}) => {
  const { productList, handleAddProduct, handleAddAllProduct, handleProductCount } = props;

  return (
    <CartTableContainer className='cart-table'>
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
            <CartTableProduct
              product={product}
              handleClick={handleAddProduct}
              handleProductCount={handleProductCount}
            />
          </tr>
        )
      }
      </tbody>
    </CartTableContainer>
  )
}

export default CartTable;