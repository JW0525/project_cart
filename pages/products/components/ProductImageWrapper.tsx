import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import CartAnimation from "@/components/common/Animation";
import uiCss from "../../../styles/uiCss";
import { backgroundIcons, palette } from "styles/baseStyle";

const ImageWrapperLayout = styled.div`
  // image width, height 비율 같게 하기 위해서 image 를 감싸준다.
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 245px;
  padding-top: 100%;
  
  .score {
    position: absolute;
    top: 0;
    left: 0;
    ${uiCss.flexRow.center};
    width: 25px;
    height: 25px;
    padding-top: 3px;
    background-color: ${palette.common.white};
    font-family: Campton-Extra-Bold, sans-serif;
    z-index: 1;
  }
  

  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .cart-animation {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  .background {
    position: absolute;
    top: 0;
    ${uiCss.flexRow.mainCenter};
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    column-gap: 50px;
    
    .noti-box {
      ${uiCss.flexColumn.center};
      color:rgba(256, 256, 256, 0.8);

      &.not-show {
        visibility: hidden;
      }

      pre {
        font-size: 0.8rem;
        line-height: 2rem;
      }
      
      > div {
        display: flex;
        cursor: pointer;
        
        span {
          display: block;
          width: 50px;
          height: 50px;
          margin: -12.5px;
          padding: 14px 6px;
          background-position: -100px 0;
          ${backgroundIcons};
          transform: scale(90%, 100%);
          filter: invert(100%);
          font-family: Campton-Semi-Bold, sans-serif;
        }
        p {
          font-size: 1.5rem;
          font-family: Campton-Extra-Bold, sans-serif;
        }
      }

    }
  }
`

const ProductImageWrapper = (props: {
  score: number;
  imgUrl: string;
  isShowAnimation: boolean;
  isListHavingProduct: boolean;
}) => {
  const { score, imgUrl, isShowAnimation, isListHavingProduct } = props;
  const router = useRouter();

  return (
    <ImageWrapperLayout>
      <span className='score'>{score}</span>
      <img src={imgUrl} />
      {
        isShowAnimation && <CartAnimation />
      }
      {
        isListHavingProduct
        && (
          <div className='background'>
            <div
              className={`noti-box ${(isShowAnimation) && 'not-show'}`}
            >
              <pre className={`${(isShowAnimation) && 'not-show'}`}>
                상품이 장바구니에 등록되었습니다.
              </pre>
                <div onClick={() => router.push('cart').then()}>
                  <span>Go</span>
                  <p>SHOPPING BAG</p>
                </div>
            </div>
          </div>
        )
      }
    </ImageWrapperLayout>
  )
}

export default ProductImageWrapper;