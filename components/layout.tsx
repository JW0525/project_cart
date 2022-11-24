import {FC, ReactNode} from "react";
import styled from "@emotion/styled";
import uiCss from "../styles/uiCss";
import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";

const LayoutContainer = styled.div`
  ${uiCss.flexColumn.crossCenter};
  width: 100vw;
  height: 100vh;
  background-color: floralwhite;
  
  main {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 296px;
    background-color: green;
  }
`

export const Layout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <LayoutContainer>
      <NavBar />
      <main>
        <SideBar />
        {children}
      </main>
    </LayoutContainer>
  )
}