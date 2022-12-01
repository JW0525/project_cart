import React from "react";
import styled from "@emotion/styled";
import CartAnimation from "@/components/common/Animation";

const ImageWrapperLayout = styled.div`
  // image width, height 비율 같게 하기 위해서 image 를 감싸준다.
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 245px;
  padding-top: 100%;

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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    pre {
      text-align: center;
      color:rgba(256, 256, 256, 0.8);
      font-size: 1.2rem;
      line-height: 1.5rem;

      &.not-show {
        visibility: hidden;
      }
    }
  }
`


const ProductImageWrapper = (props: {
  imgUrl: string;
  isShowAnimation: boolean;
  isListHavingProduct: boolean;
}) => {
  const { imgUrl, isShowAnimation, isListHavingProduct } = props;

  return (
    <ImageWrapperLayout>
      <img src={imgUrl} />
      {
        isShowAnimation && <CartAnimation />
      }
      {
        isListHavingProduct
        && (
          <div className='background'>
            <pre className={`${(isShowAnimation) && 'not-show'}`}>
              상품이 장바구니에<br />등록되었습니다.
            </pre>
          </div>
        )
      }
    </ImageWrapperLayout>
  )
}

export default ProductImageWrapper;