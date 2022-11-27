import {FC, ReactNode} from "react";
import styled from "@emotion/styled";
import uiCss from "../../styles/uiCss";
import NavBarLayout from "./navBarLayout";

const LayoutContainer = styled.div`
  ${uiCss.flexColumn.crossCenter};
  width: 100vw;
  height: 100%;
  padding: 0 50px;
  //background-color: floralwhite;
  
  main {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 300px;
  }
`

export const Layout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <LayoutContainer>
      <NavBarLayout />
      <main>
        {children}
      </main>
    </LayoutContainer>
  )
}