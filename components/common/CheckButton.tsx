import React from "react";
import styled from "@emotion/styled";
import textCss from "../../styles/textCss";
import { border}  from "../../styles/baseStyle";
import uiCss from "../../styles/uiCss";

const ButtonContainer = styled.button`
  ${uiCss.flexRow.center};
  width: 400px;
  height: 70px;
  ${textCss.gray25Bold};
  font-family: Campton-Semi-Bold, sans-serif;
  ${border.grayMedium}

  &:hover {
    color: #FF4800;
  }
`

const CheckButton = (props: {
  text: string,
  type: string
}) => {
  const { text, type } = props;

  return (
    <ButtonContainer className={`check-button ${type}`}>
      {text}
    </ButtonContainer>
  )
}

export default CheckButton;