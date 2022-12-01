import React from "react";
import styled from "@emotion/styled";
import CheckButton from "@/components/common/CheckButton";

const CheckButtonLayout = styled.div`
  display: flex;
  grid-column-gap: 10px;
`

const CheckButtonBox = (props: {
  handleDispatchProductList: any;
  handleDispatchCart: any;
}) => {
  const { handleDispatchProductList, handleDispatchCart } = props;

  return (
    <CheckButtonLayout>
      <CheckButton
        type='white'
        text='CONTINUE SHOPPING'
        callback={ handleDispatchProductList }
      />
      <CheckButton
        type='black'
        text='CHECK OUT'
        callback={ handleDispatchCart }
      />
    </CheckButtonLayout>
  )
}

export default CheckButtonBox;