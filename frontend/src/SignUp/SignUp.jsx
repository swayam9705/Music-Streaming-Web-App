import React from "react"
import Logo from "../assets/logo.svg"

import GoogleIcon from "@mui/icons-material/Google"

import "./SignUp.css"

function SignUp() {

    return (
        <div className="Signup">
            <div className="SignUp__logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="Signup__form">
                <h1>Sign In</h1>
                <button className="Signup__signinwithgoogle">Sign In with Google <GoogleIcon className="Signup__google-icon" /> </button>
            </div>
        </div>
    )
}

export default SignUp