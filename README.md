# Description

---
- **emotion** 의 `facepaint` 를 이용하여 반응형 페이지로 제작하였습니다.
    - 이에 따라 **products** 페이지에서 상품 목록은 3개, 2개, 1개 단위로 보여집니다. 디자인적 통일성을 위해 **Pagination** 은 상품 score 를 기준으로 6개 항목을 보여주도록 설정하였습니다.
- **next.js** 를 이용하여 서버로 api 를 호출하여서 데이터를 받아오도록 하였습니다. 데이터는 SWR 을 이용한 커스텀 함수를 통해 받아오도록 구현하였습니다.
- 전역 상태 관리는 **redux-toolkit** 을 이용하였으며, 페이지별 store 를 구성하였습니다.
- **git commit** 은 gitHub flow 의 기본 원칙을 따라서 작성되었습니다.

- 장바구니 페이지로는 **navbar** 상단 우측 장바구니 아이콘을 클릭함으로 이동 가능하며, 상품을 선택한 후 상품 이미지 가운데에 생성되는 **SHOPPING BAG** 문구를 클릭해서도 이동이 가능합니다.
- 쿠폰 사용이 가능할 경우, `쿠폰 가능 상품` 이라는 문구가 포함됩니다. 쿠폰 사용이 가능하지 않은 상품들만 장바구니에 담겼을 경우, 쿠폰 선택 모달 에 쿠폰 목록이 뜨지 않습니다.

## **기술 스택 및 라이브러리**

`TypeScript`, `React`, `Redux-toolkit`, `emotion`, `react-lottie-player`, `swr`

# Install

---

```tsx
npm install
```

# Usage

---

```tsx
npm run dev // 3001 port 로 실행됩니다.
```

# Directory Structure

---

```tsx
|-- components
|-- pages
|-- public
|-- store
|-- styles
|-- utils
```

폴더 구조는 일반적인 **Next.js** 의 폴더 구조를 따르되 필요에 따라 아래와 같이 설정하였습니다.

- `components` 는 가장 작은 단위인 `atom`, 전역에서 공용으로 사용될 수 있는 컴포넌트들을 모아놓은 `common`, **next.js** 의 **layout** 컴포넌트들을 모아놓은 `layout` 폴더로 구분하였습니다.
- `pages` 에는 서버 관련 파일을 다루는 `api`, 데이터 처리 함수들을 모아 놓은 `lib` 폴더가 있으며 **cart**, **products** 두 개의 페이지 폴더가 있습니다. 각 페이지의 `components` 폴더 안에 해당 페이지에서 사용하는 컴포넌트들을 분류하였고, 재사용 가능성이 적은 컴포넌트들은 모두 하위 폴더 안에 구성하였습니다.
- `public` asset 폴더에서 animation, fonts, gif, icons 등을 다루고 있습니다.
- `store` 에는 redux-toolkit 설정 파일들이 있습니다.
- `styles` 에는 글로벌 css 를 설정하는 `global.ts`, 커스텀 style 파일, 반응형 작업에 사용되는 `setResponsive` 파일 등이 있습니다.
- `utils` 에는 공용으로 사용하는 함수 등이 있습니다.

# Contact

---

**email**: constell847@gmail.com

**github**: [github.com/JW0525](http://github.com/JW0525)

**blog**: [https://constell847.oopy.io/](https://constell847.oopy.io/)