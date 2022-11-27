import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import { border, palette } from "../../styles/baseStyle";
import textCss from "../../styles/textCss";
import uiCss from "../../styles/uiCss";
import { mainCategoryList } from "../../pages/api/utils/catgoryList";

const NavBarContainer = styled.div<{ scrollY: number }>`
  ${uiCss.flexColumn.custom('center', 'flex-start')};
  position: fixed;
  width: 100vw;
  padding: 10px 50px;
  height: ${props => (props.scrollY > 75) ? '125px' : '225px'};
  border-bottom: ${props => (props.scrollY > 75) && `${border.grayLightDD.border}`};
  background-color: ${palette.common.white};
  z-index: 20;
  
  .category-box {
    ${uiCss.flexRow.custom('flex-start')};
    grid-column-gap: 20px;
    min-width: 1024px;
    
    &.main {
      margin-bottom: 10px;
      
      li {
        ${textCss.gray35Bold}
        font-family: "Campton-Extra-Bold", sans-serif;
      }
    }
    
    &.sub {
      cursor: pointer;
      
      li {
        font-family: Campton-Semi-Bold, sans-serif;
      }
    }
  }
`

const NavBarLayout = () => {
  // 스크롤 Y 위치 저장. scrollY 75 분기점
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
      <ul className='category-box main'>
        <li>Special-Order</li>
        <li>ShowCase</li>
        <li>PT</li>
        <li>WeLove</li>
      </ul>

      <ul className='category-box sub'>
        {
          mainCategoryList.map((category, idx) => {
            return (
              <li key={idx}>{category}</li>
            )
          })
        }
      </ul>
    </NavBarContainer>
  )
}

export default NavBarLayout;