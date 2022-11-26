import React from 'react';
import styled from '@emotion/styled';

const CheckBoxLayout = styled.label`
  > input {
    display: none;
  }

  & > input:checked ~ span {
    background-color: green;
  }

  > span.icon {
    display: block;
    padding: 0 2px;
    width: 20px;
    height: 20px;
    background-color: blue;
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