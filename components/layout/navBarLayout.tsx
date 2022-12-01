import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {backgroundIcons, border, palette} from "../../styles/baseStyle";
import uiCss from "../../styles/uiCss";
import { mainCategoryList } from "../../pages/api/utils/catgoryList";
import {setResponsive} from "../../styles/setResponsive";
import Link from "next/link";

const NavBarContainer = styled.div<{ scrollY: number }>`
  position: fixed;
  ${uiCss.flexColumn.custom('center', 'flex-start')};
  grid-row-gap: 10px;
  width: 100%;
  height: ${props => (props.scrollY > 75) ? '175px' : '225px'};
  padding: 10px 50px;
  background-color: ${palette.common.white};
  border-bottom: ${props => (props.scrollY > 75) && `${border.grayLightDD.border}`};
  z-index: 20;
  
  .icon-box {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .logo-icon {
      width: 240px;
      height: 60px;
      margin: -15px -60px;
      background-position: 0px -180px;
      ${backgroundIcons};
      transform:scale(50%, 50%);
    }
    
    > div {
      right: 50px;
      display: flex;
      align-items: center;
      
      p {
        display: block;
        font-size: 12px;
        font-family: Campton-Book;
      }

      .cart-icon {
        display: block;
        width: 50px;
        height: 50px;
        margin: -12.5px;
        background-position: -100px 0;
        ${backgroundIcons};
        transform: scale(45%, 50%);
      }
    }

  }
  
  .category-box {
    ${uiCss.flexRow.custom('flex-start')};
    grid-column-gap: 20px;
    
    &.main {
      li {
        display: block;
        ${setResponsive({
          fontSize: ['40px', '40px', '50px'],
        })}
        font-family: "Campton-Extra-Bold", sans-serif;
      }
    }
    
    &.sub {
      cursor: pointer;
      
      li {
        ${setResponsive({
          fontSize: ['14px', '14px', '16px'],
        })}
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
      <div className='icon-box'>
        <span className='logo-icon' />
        <div>
          <span className='cart-icon' />
          <Link className='link' href='/cart'>
            <p>SHOPPING BAG</p>
          </Link>
        </div>
      </div>
      <ul className='category-box main'>
        <li>SpecialOrder</li>
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