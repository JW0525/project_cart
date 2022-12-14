import React from 'react';
import styled from '@emotion/styled';
import uiCss from 'styles/uiCss';
import CouponModal from "./CouponModal";

const ModalsLayout = styled.div`
  ${uiCss.flexRow.center};
  ${uiCss.position.fixed(0,0,0,0)}
  z-index: 100;
  overflow: hidden;
  animation: fadein 0.4s;

  @keyframes fadein {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }

  .back {
    ${uiCss.position.absolute(0,0,0,0)}
    background: rgba(0, 0, 0, 0.2);
  }
`;

const CouponModalContainer = (props: {
  modalData: Function
}) => {
  const { modalData } = props;
  const { selectedCoupon, couponData, productList, setShowModal } = modalData();

  return (
    <ModalsLayout className='modals'>
      <CouponModal
        selectedCoupon={selectedCoupon}
        couponData={couponData}
        productList={productList}
        setShowModal={setShowModal}
      />
      <div className='back' />
    </ModalsLayout>
  );
};
export default CouponModalContainer;