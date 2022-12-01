import styled from "@emotion/styled";
import Image from "next/image";
import loadingBarImage from "/public/asset/gif/loading-bar-image.gif";
import React from "react";

const LoadingBarContainer = styled.div<{ left: number }>`
  position: fixed;
  z-index: 1000;
  top:0;
  left: ${(props) => props.left}px;
  right:0;
  bottom:0;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
`

const LoadingBar = (props: {
  left: number;
}) => {
  const { left } = props;

  return (
    <LoadingBarContainer left={left}>
      <div className='contents'>
        <Image
          src={loadingBarImage}
          alt='loading bar'
          width={100}
          height={100}
          priority
        />
      </div>
    </LoadingBarContainer>
  )
}

export default LoadingBar;
