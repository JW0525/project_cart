import React from "react";
import Lottie from 'react-lottie-player';
// import animationData from './shopping-cart-animation.json'
import animationData from '../../public/asset/animation/shopping-cart-animation.json'

const CartAnimation = () => {

  return (
    <Lottie
      className='cart-animation'
      loop
      animationData={animationData}
      play
    />
  )
}

export default CartAnimation;