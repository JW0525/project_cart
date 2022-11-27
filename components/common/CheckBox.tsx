import React from 'react';
import styled from '@emotion/styled';
import {backgroundImages} from "../../styles/baseStyle";

const CheckBoxLayout = styled.label`
  > input {
    display: none;
  }

  & > input:checked ~ span {
    ${backgroundImages.icon('check-box-checked.png')};
  }

  > span.icon {
    display: block;
    padding: 0 2px;
    width: 20px;
    height: 20px;
    ${backgroundImages.icon('check-box-non.png')};
  }
`;

const CheckBoxWrapper = (props: { isChecked: boolean; callback: any, value?: number }) => {
  const { isChecked, callback, value } = props;

  return (
    <CheckBoxLayout className='checkBox'>
      <input
        type='checkBox'
        checked={isChecked}
        onChange={callback}
        value={value}
        readOnly
      />
      <span className="icon"/>
    </CheckBoxLayout>
  );
};
export default CheckBoxWrapper;