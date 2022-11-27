import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import { palette } from "../../styles/baseStyle";
import textCss from "../../styles/textCss";
import uiCss from "../../styles/uiCss";

const NavBarContainer = styled.div<{ scrollY: number }>`
  ${uiCss.flexColumn.custom('center', 'flex-start')};
  position: fixed;
  width: 100vw;
  padding: 10px 50px;
  height: ${props => (props.scrollY > 75) ? '125px' : '225px'}; // 스크롤 내려가면 작아지도록 변경.
  background-color: ${palette.common.white};
  z-index: 20;
  
  .category-box {
    ${uiCss.flexRow.center};
    grid-column-gap: 20px;
    
    &.main {
      margin-bottom: 10px;
      
      h3 {
        ${textCss.gray25Bold}
      }
    }
  }
`

const NavBarLayout = () => {
  const [scrollY, setScrollY] = useState<number>();

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      setScrollY(window.scrollY);
    });
  },[]);

  return (
    <NavBarContainer
      scrollY={scrollY as number}
    >
      <div className='category-box main'>
        <h3>Special-Order</h3>
        <h3>ShowCase</h3>
        <h3>PT</h3>
        <h3>WeLove</h3>
      </div>

      <div className='category-box sub'>
        <h6>BEST</h6>
        <h6>WOMEN</h6>
        <h6>MEN</h6>
        <h6>INTERIOR</h6>
        <h6>KITCHEN</h6>
        <h6>ELECTRONICS</h6>
        <h6>DIGITAL</h6>
        <h6>BEAUTY</h6>
        <h6>FOOD</h6>
      </div>
    </NavBarContainer>
  )
}

export default NavBarLayout;