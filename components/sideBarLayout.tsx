import styled from "@emotion/styled";

const SidBarContainer = styled.div`
  
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
    <SidBarContainer>
      <div className='side-bar' />
      {props.children}
    </SidBarContainer>
  )
}

export default SideBarLayout;
