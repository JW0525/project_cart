import {FC, ReactNode} from "react";
import styled from "@emotion/styled";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: floralwhite;
`

export const Layout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <LayoutContainer>
      <main>
        {children}
      </main>
    </LayoutContainer>
  )
}