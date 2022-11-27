import styled from "@emotion/styled";
import textCss from "../../styles/textCss";
import { border, palette } from "../../styles/baseStyle";
import { categoryList } from "../../pages/api/utils/catgoryList";

const SideBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  .side-bar {
    position: absolute;
    top: 300px;
    width: 300px;
    height: 100%;
    padding: 0 50px;
    
    button {
      width: 100%;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: ${border.grayMain4x.border};
      ${textCss.gray22Bold};
      font-family: "Campton-Black", sans-serif;
      text-align: initial;
      letter-spacing: 2px;
    }
    
    ul {
      display: grid;
      grid-row-gap: 10px;
      cursor: pointer;
      
      li {
        ${textCss.gray16Medium};
        color: ${palette.gray.lightAA};
        
        &.selected {
          ${textCss.gray16Bold};
        }
      }
    }
  }
`

const SideBarLayout = (props: any) => {
  const selected = '종합';

  return (
    <SideBarContainer>
      <div className='side-bar'>
        <button>BEST</button>
        <ul>
          {
            categoryList.map((category, index: number) =>
              <li
                className={`${category === selected && 'selected'}`}
                key={index}
              >
                {category}
              </li>
            )
          }
        </ul>
      </div>
      {props.children}
    </SideBarContainer>
  )
}

export default SideBarLayout;
