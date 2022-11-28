import React from "react";
import styled from "@emotion/styled";
import { palette, radius } from "../../styles/baseStyle";
import textCss from "../../styles/textCss";

const CouponAvailableBoxLayout = styled.span`
  padding: 2px 4px;
  min-width: 75px;
  background-color: ${palette.gray.lightEE};
  ${radius.micro};
  ${textCss.gray12Medium}
`

const couponAvailableBox = () => {

  return (
    <CouponAvailableBoxLayout>
      쿠폰 사용 가능
    </CouponAvailableBoxLayout>
  )
};

export default couponAvailableBox;