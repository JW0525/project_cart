import React from "react";
import styled from "@emotion/styled";
import textCss from "../../styles/textCss";
import {border, palette} from "../../styles/baseStyle";
import uiCss from "../../styles/uiCss";

const ButtonContainer = styled.button`
  ${uiCss.flexRow.center};
  width: 400px;
  height: 70px;
  ${textCss.gray25Bold};
  font-family: Campton-Semi-Bold, sans-serif;
  ${border.grayMedium}
  
  &.white {
    &:hover {
      color: #FF4800;
    }
  }
  
  &.black {
    background-color: ${palette.common.black};
    color: ${palette.common.white};

    &:hover {
      color: #FF4800;
    }
  }
`

const CheckButton = (props: {
  text: string,
  type: string,
  callback?: any
}) => {
  const { text, type, callback } = props;

  return (
    <ButtonContainer
      className={`check-button ${type}`}
      onClick={callback}
    >
      {text}
    </ButtonContainer>
  )
}

export default CheckButton;