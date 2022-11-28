import Dropdown from "@/components/common/Dropdown";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {border, palette} from "../../../styles/baseStyle";
import textCss from "../../../styles/textCss";
import {ProductState, setCoupon} from "../../../store/cartSlice";
import {useDispatch} from "react-redux";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 20px;
  position: absolute;
  top: calc(50% - 300px);
  width: 500px;
  padding: 30px;
  background-color: ${palette.common.white};
  ${border.grayLightDD};

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
        display: flex;
        justify-content: center;
        align-items: center;
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

  const handleSelectedCoupon = (e: any) => {
    const value = e.target.innerHTML;
    setSelectedCouponTitle(value);
  }

  const handleDispatchCoupon = () => {
    setShowModal(false);    // 모달 창 닫기

    const coupon = couponData.find((data: any) =>
      data.title === selectedCouponTitle
    );
    dispatch(setCoupon(coupon));
  }

  useEffect(() => {
    if (selectedCoupon.title) {
      setSelectedCouponTitle(selectedCoupon.title);
    }
  },[]);

  return (
    <ModalContainer>
      <div className='modal-title'>
        <p>쿠폰 / 마일리지</p>
        <button onClick={() => handleDispatchCoupon()}>적용하기</button>
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
              content={selectedCouponTitle}
              isShow={showDropdown}
              changeHandler={handleSelectedCoupon}
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
    </ModalContainer>
  )
}

export default CouponModal;