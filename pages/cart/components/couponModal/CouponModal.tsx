import React, {useEffect, useRef, useState} from "react";
import { useDispatch } from "react-redux";
import { ProductState, setCoupon } from "../../../../store/cartSlice";
import styled from "@emotion/styled";
import {backgroundImages, border, palette } from "../../../../styles/baseStyle";
import textCss from "../../../../styles/textCss";
import Dropdown from "@/components/common/Dropdown";
import uiCss from "../../../../styles/uiCss";

const CouponModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  grid-row-gap: 20px;
  width: 500px;
  padding: 30px;
  background-color: ${palette.common.white};
  ${border.grayLightDD};
  z-index: 50;

  .modal-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: ${border.grayLightDD.border};
    
    p {
      ${textCss.gray18Bold};
      font-family: Campton-Semi-Bold, sans-serif;
    }
    
    span {
      width: 20px;
      height: 20px;
      margin: 7.5px;
      ${backgroundImages.icon('delete-button.png')};
      cursor: pointer;
    }
    
    button {
      width: 80px;
      height: 35px;
      background-color: ${palette.gray.main};
      ${border.grayLightDD};
      ${textCss.gray14Medium};
      color: ${palette.common.white};
    }
  }
  
  .modal-contents {
    display: flex;
    flex-direction: column;
    grid-row-gap: 10px;
    height: 100%;
    
    > div {
      display: grid;
      align-items: center;
      grid-template-columns: 100px 1fr;
    }
    
    .coupon-box {
      width: 100%;


      .dropdown-wrapper {
        ${uiCss.flexRow.center};
        position: relative;
        height: 45px;
        ${border.grayLightDD};
      }
    }
    
    .mileage-input-wrapper {
      display: grid;
      grid-template-columns: 160px 80px 1fr;
      grid-column-gap: 10px;
      align-items: center;

      > input {
        height: 45px;
        ${border.grayLightDD};
      }
      
      > button {
        height: 45px;
        ${border.grayLightDD};
        ${textCss.gray13Medium};
        
        &:disabled {
          background-color: ${palette.gray.lightEE};
        }
      }

      span {
        display: flex;
        flex-direction: column;
        ${textCss.gray14Medium};

        p {
          ${textCss.gray14Bold};
        }
      }
    }
  }
`

const CouponModal = (props: {
  selectedCoupon: any;
  couponData: any;
  productList: ProductState[];
  setShowModal: Function;
}) => {
  const { selectedCoupon, couponData, productList, setShowModal } = props;
  const dispatch = useDispatch();
  const [selectedCouponTitle, setSelectedCouponTitle] = useState('=== 사용가능 쿠폰 ===');
  const [showDropdown, setShowDropdown] = useState(false);
  const isAvailableCoupon = !productList.every(product => product.availableCoupon === false);
  const refSelectedCouponTitle = useRef(selectedCouponTitle).current;

  const handleClose = () => {
    document.body.style.overflow = 'unset';
    setShowModal(false);    // 모달 창 닫기
  }

  const handleSelectedCoupon = (e: any) => {
    const value = e.target.innerHTML;
    setSelectedCouponTitle(value);
  }

  const handleDispatchCoupon = () => {
    handleClose();

    const coupon = couponData.find((data: any) =>
      data.title === selectedCouponTitle
    );
    dispatch(setCoupon(coupon));
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';    // 모달 창 바깥 영역 스크롤 방지
  }, []);

  useEffect(() => {
    if (selectedCoupon.title) {
      setSelectedCouponTitle(selectedCoupon.title);
    }
  },[]);

  return (
    <CouponModalLayout>
      <div className='modal-title'>
        <p>쿠폰 / 마일리지</p>
        {
          (refSelectedCouponTitle === selectedCouponTitle) ?
          <span onClick={handleClose} /> :
          <button onClick={() => handleDispatchCoupon()}>적용하기</button>
        }
      </div>

      <div className='modal-contents'>
        <div className='coupon-box'>
          <p>쿠폰</p>
          <div
            className='dropdown-wrapper'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Dropdown
              data={isAvailableCoupon ? couponData : null} /* 쿠폰 사용이 불가능한 상품들로만 구성시 null 값을 내려준다. */
              content={isAvailableCoupon ? selectedCouponTitle : '사용 가능한 쿠폰이 없습니다'}
              isShow={showDropdown}
              changeHandler={handleSelectedCoupon}
              placeHolder='선택 안함'
            />
          </div>
        </div>

        <div className='mileage-box'>
          <p>마일리지</p>
          <div className='mileage-input-wrapper'>
            <input disabled={true} type='text'/>
            <button disabled={true}>모두 사용</button>
            <span>보유 마일리지&nbsp;<p>0p</p></span>
          </div>
        </div>
      </div>
    </CouponModalLayout>
  )
}

export default CouponModal;