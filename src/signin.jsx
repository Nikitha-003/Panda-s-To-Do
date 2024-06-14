import React, { useState } from 'react'
import './signin.css'
import google from "../src/assets/google.png"
import animation from "./assets/animation.json"
import pandaanimation from "./assets/pandaanimation.json"
import lottie from "lottie-react"
import Lottie from 'lottie-react'
import { useNavigate } from "react-router-dom"
import { signInWithPopup } from 'firebase/auth'
import{ auth , provider } from './firebase'

function Signin() {
  const [redirect,setRedirect] =useState(false)
  const navigate = useNavigate()
  const handleClick = () =>{

    signInWithPopup (auth , provider).then(()=>
      {
      setRedirect(true)
    })

  }

  return (
    <div className='authentication'>
        <div className='authdiv'>
            <div className ="signintext">
              <h1>Sign-In</h1>
              <>to</>
            </div>
            
            <div className='appname'>
              <div className='pandastodo'>
                <h2 >Panda's To-Do</h2>
              </div>
              <div className='pandaLottie'>
                <Lottie animationData={pandaanimation} loop={true}/>
              </div>
            </div>

            <div className='todolottie'>
              <Lottie animationData={animation} loop={true}/>
            </div>
            <div className='loginbutton'>
              <button onClick={handleClick} className='signinbutton'>
                 {/* when we click this a pop up will appear from the provider for authentication */}
                <div className='googleimage'>
                  <img src={google} alt="" className='google'/>
                </div>
                <div className='continue'> 
                  Continue with Google
                </div>
              </button>
              </div>
        </div>
        {redirect?navigate("/home"):console.log("error ")}
        {/* if the sign in is success it will be redirected to to do page else it will show an error message in console */}
     </div>
  )
}

export default Signin