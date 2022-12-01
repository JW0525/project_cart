import React from "react";
import styled from "@emotion/styled";
import textCss from "styles/textCss";
import { border } from "../../../../styles/baseStyle";
import { NumberToCurrency } from "../../../../utils/regExpression";
import uiCss from "styles/uiCss";
import { IAmounts } from "../../index";

const OrderTableLayout = styled.table`
  width: 100%;
  border-top: ${border.grayMain4x.border};
  border-bottom: ${border.grayMain.border};
  
  thead {
    tr {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      align-items: center;
      height: 70px;

      td {
        text-align: center;
      }
    }
  }

  tbody {
    tr {
      display: grid;
      grid-template-columns: 1fr 20px 1fr 20px 1fr 20px 1fr;
      align-items: center;
      height: 150px;
      border-top: ${border.grayLightDD.border};

      td {
        position: relative;
        ${uiCss.flexRow.center};
        font-family: Campton-Semi-Bold, sans-serif;
        font-size: 32px;
        
        p {
          ${textCss.gray16Medium};
          
          &.coupon {
            position: absolute;
            top: 35px;
            font-size: 13px;
          }
        }
      }
    }
  }
`

const OrderTable = (props: {
  amounts: IAmounts;
  coupon: any;
}) => {
  const { amounts, coupon } = props;
  const { totalAmounts, totalAmountsOrigin } = amounts;

  return (
    <OrderTableLayout className='order-table'>
      <thead>
      <tr>
        <td>총 주문금액</td>
        <td>쿠폰 할인</td>
        <td>총 배송비</td>
        <td>총 결제금액</td>
      </tr>
      </thead>

      <tbody>
      <tr>
        <td>{NumberToCurrency(totalAmountsOrigin)}<pre> 원</pre></td>
        <td>-</td>
        <td>
          {NumberToCurrency(totalAmountsOrigin-totalAmounts)}<pre> 원</pre>
          {
            (totalAmountsOrigin-totalAmounts > 0) && (
              <p className='coupon'>({coupon.title} 적용)</p>
            )
          }
        </td>
        <td>+</td>
        <td>
          0 <pre> 원</pre>
        </td>
        <td>+</td>
        <td>
          {NumberToCurrency(totalAmounts)}<pre> 원</pre>
        </td>
      </tr>
      </tbody>
    </OrderTableLayout>
  )
}

export default OrderTable;