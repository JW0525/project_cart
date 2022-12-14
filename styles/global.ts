import { css } from "@emotion/react";

const global = css`
  * {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
  }

  html {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  select,
  input,
  button,
  textarea {
    border: 0;
    outline: 0 !important;
  }

  button {
    background: inherit;
    border:none; 
    box-shadow:none; 
    border-radius:0; 
    padding:0; 
    overflow:visible; 
    cursor:pointer
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .link {
    margin: 0;
    color: inherit;
    text-decoration: none;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;

export default global;