import React from "react";
import styled from "@emotion/styled";
import {border, palette} from "../../styles/baseStyle";
import textCss from "../../styles/textCss";


const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  
  ul {
    //display: none;
    position: absolute;
    top: 40px;
    left: -1px;
    flex-direction: column;
    width: 100.5%;
    background-color: ${palette.common.white};
    ${border.grayLightDD};
    border-top-style: none !important;
    ${textCss.gray12Medium};
    z-index: 1;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
    }
  }
`

const Dropdown = (props: {
  content: string;
  data: any;
  isShow: boolean;
  changeHandler: any;
}) => {
  const { content, data, isShow, changeHandler } = props;

  return (
    <DropdownContainer>
      <div>{data ? content : '사용 가능한 쿠폰이 없습니다'}</div>
      {
        (isShow && data) && (
          <ul>
            <li onClick={changeHandler}>선택 안함</li>
            {
              data.map((e: any, idx: number) => {
                return (
                  <li onClick={changeHandler} key={idx}>{e.title}</li>
                )
              })
            }
          </ul>
        )
      }
    </DropdownContainer>
  )
}

export default Dropdown;