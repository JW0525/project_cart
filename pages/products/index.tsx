import React, {ReactElement} from "react";
import getData from "@/lib/getData";
import { API } from "../../config";
import styled from "@emotion/styled";
import { setResponsive } from "../../styles/setResponsive";
import { NextPageWithLayout } from "../_app";
import SideBarLayout from "@/components/layout/sideBarLayout";
import textCss from "../../styles/textCss";
import { NumberToCurrency } from "../../utils/regExpression";

export interface IProductData {
  detail_image_url: string,
  item_name: string,
  item_no: number,
  price: number,
  score: number
}

const ProductsPageContainer = styled.div`
  width: 100%;
  margin-left: 300px;

  ul {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;

    li {
      display: grid;
      ${setResponsive({
        flexBasis: ['100%', '47%', '30%'],
      })}
    
       // image width, height 비율 같게 하기 위해서 image 를 감싸준다.
      .image-wrapper {
        position: relative;
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
      }
      
      .description-container {
        display: grid;
        grid-template-columns: 1fr 60px;
        height: 85px;
        padding: 10px 5px;
        
        .text-box {
          margin-right: 10px;
          h1 {
            padding-bottom: 10px;
            ${textCss.gray12Medium}
            color: #5d5d5d;
          }
          
          span {
            display: flex;
            
            p {
              ${textCss.gray14Bold}

              :nth-of-type(2) {
                padding-left: 2px;
                font-size: 12px;
                font-weight: 400;
              }
            }
          }
        }
        
        .cart-button-box {
          
          button {
            width: 30px;
            height: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
`

const ProductsPage: NextPageWithLayout = () => {
  const { data, isLoading, isError } = getData(`${API.PRODUCTS}`);
  if (!data) return <></>

  const sortedData = data.sort(function(a: any,b: any) {
    return b.score - a.score;
  })
  
  return (
    <ProductsPageContainer>
      <ul>
        {
          sortedData.map((e: any, idx: number) => {
            return (
              <li key={idx}>
                <div className='image-wrapper'>
                  <img src={e.detail_image_url} />
                </div>
                <div className='description-container'>

                  <div className='info-box'>
                    <h1>{e.item_name}</h1>
                    <span>
                    <p>{NumberToCurrency(e.price)}</p>
                    <p>원</p>
                  </span>
                  </div>

                  <div className='cart-button-box'>
                    <button className='add-cart'>+</button>
                    <button className='subtract-cart'>-</button>
                  </div>

                </div>
              </li>
            )
          })
        }
      </ul>
    </ProductsPageContainer>
  )
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <SideBarLayout> {/* 중첩할 nested layout */}
       { page }
      </SideBarLayout>
    </>
  );
};

export default ProductsPage;
