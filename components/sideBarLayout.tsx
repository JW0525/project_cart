import styled from "@emotion/styled";

const SideBarContainer = styled.div`
  height: 100%;
  position: relative;
  
  .side-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300px;
    background-color: blue;
  }
`

const SideBarLayout = (props: any) => {

  return (
    <SideBarContainer>
      <div className='side-bar' />
      {props.children}
    </SideBarContainer>
  )
}

export default SideBarLayout;
