import { css } from "@emotion/react";

export const spacing = {
  mt: (value: number) => css`
    margin-top: ${value}px;
  `,
  mb: (value: number) => css`
    margin-bottom: ${value}px;
  `,
  ml: (value: number) => css`
    margin-left: ${value}px;
  `,
  mr: (value: number) => css`
    margin-right: ${value}px;
  `,
  mx: (value: number) => css`
    margin-left: ${value}px;
    margin-right: ${value}px;
  `,
  my: (value: number) => css`
    margin-top: ${value}px;
    margin-bottom: ${value}px;
  `,
  m: (value: number) => css`
    margin-top: ${value}px;
    margin-bottom: ${value}px;
    margin-left: ${value}px;
    margin-right: ${value}px;
  `,
};

export const position = {
  static: (top: number|null, right: number|null, bottom: number|null, left: number|null) => css`
    position: static;
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `,
  relative: (top: number|null, right: number|null, bottom: number|null, left: number|null) => css`
    position: relative;
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `,
  fixed: (top: number|null, right: number|null, bottom: number|null, left: number|null) => css`
    position: fixed;
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `,
  absolute: (top: number|null, right: number|null, bottom: number|null, left: number|null) => css`
    position: absolute;
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `,
  sticky: (top: number|null, right: number|null, bottom: number|null, left: number|null) => css`
    position: sticky;
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `,
}

export const flexRow = {
  center: () => css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  mainCenter: () => css`  // main-axis center
    display: flex;
    justify-content: center;
  `,
  crossCenter: () => css` // cross-axis center
    display: flex;
    align-items: center;
  `,
  custom: (ma: string, ca?: string) => css`
    display: flex;
    justify-content: ${ma};
    align-items: ${ca};
  `
}

export const flexColumn = {
  center: () => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  mainCenter: () => css`  // main-axis center
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  crossCenter: () => css` // cross-axis center
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  custom: (ma: string, ca?: string) => css`
    display: flex;
    flex-direction: column;
    justify-content: ${ma};
    align-items: ${ca};
  `
}


const uiCss = {
  spacing,
  position,
  flexRow,
  flexColumn
}

export default uiCss;