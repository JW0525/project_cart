import React, {ReactElement} from "react";
import getData from "@/lib/getData";
import { API } from "../../config";
import styled from "@emotion/styled";
import { setResponsive } from "../../styles/setResponsive";
import { NextPageWithLayout } from "../_app";
import SideBarLayout from "@/components/sideBarLayout";
import textCss from "../../styles/textCss";
import { NumberToCurrency } from "../../utils/regExpression";

const ProductsPageContainer = styled.div`
  margin-left: 300px;
  width: 100%;
  
  ul {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    width: 100%;

    li {
      display: grid;
      position: relative;
      width: 100%;
      ${setResponsive({
        flexBasis: ['100%', '47%', '30%'],
      })}
    
      .image-container {
        display: flex;
        flex-direction: column;
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 10%;
        padding: 30px 0 0 0 ;
        
        h1 {
          padding-bottom: 10px;
          ${textCss.gray12Medium}
          color: #5d5d5d;
        }
        
        span {
          display: flex;
          align-items: center;

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
                <div className='image-container'>
                  <img src={e.detail_image_url} />
                </div>
                <div className='description-container'>
                  <h1>{e.item_name}</h1>
                  <span>
                    <p>{NumberToCurrency(e.price)}</p>
                    <p>원</p>
                  </span>
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
