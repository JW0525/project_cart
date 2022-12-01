import React from "react";
import styled from "@emotion/styled";
import {palette} from "../../../styles/baseStyle";

const StepBoxLayout = styled.div`
  display: flex;
  justify-content: center;
  grid-column-gap: 10px;
  padding: 10px 0 90px;
  
  p {
    font-family: Campton-Medium, sans-serif;
    color: ${palette.gray.lightDD};
    
    &.step {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      white-space: normal;
      overflow: hidden;
    }
    
    &.selected {
      color: ${palette.gray.main};
    }
  }
`

const StepBox = () => {
  return (
    <StepBoxLayout>
      <p className='step selected'>01 SHOPPING BAG</p>
      <p> &gt; </p>
      <p className='step'>02 ORDER</p>
      <p> &gt; </p>
      <p className='step'>03 ORDER CONFIRMED</p>
    </StepBoxLayout>
  )
}

export default StepBox;