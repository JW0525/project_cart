import styled from "@emotion/styled";
import { palette } from "../styles/baseStyle";

const NavBarContainer = styled.div`
  width: 100vw;
  height: 300px; // 스크롤 내려가면 작아지도록 변경.
  position: fixed;
  background-color: ${palette.common.white};
  z-index: 20;
`

const NavBarLayout = () => {
  return (
    <NavBarContainer>
      <div>BEST</div>
      <div>WOMEN</div>
      <div>MEN</div>
    </NavBarContainer>
  )
}

export default NavBarLayout;