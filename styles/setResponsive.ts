// @ts-ignore
import facepaint from 'facepaint';

export const viewportBreakpoints: number[] = [1024, 1280, 1660];

export const minWidth: number = viewportBreakpoints.slice(0,1)[0];
export const midWidth: number = viewportBreakpoints.slice(1,2)[0];
export const maxWidth: number = viewportBreakpoints.slice(-1)[0];

export const setResponsive = facepaint(
  viewportBreakpoints.map(bp => `@media (min-width: ${bp}px)`)
);