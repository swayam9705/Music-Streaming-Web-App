import React from "react"
import Logo from "../assets/logo.svg"
import GoogleIcon from "@mui/icons-material/Google"
import "./SignUp.css"
import GoogleImage from "../assets/google.png"

// firebase sign in with google
import { auth } from "../config/firebase_config"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import { useStateValue } from "../ContextManager"

function SignUp() {

    const [ _, dispatch ] = useStateValue()

    const handleClick = async () => {
        const provider = new GoogleAuthProvider
        await signInWithPopup(auth, provider)
            .then((userCredential) => {
                const user = userCredential.user
                dispatch({
                    type: "LOGGED_IN",
                    user: user
                })

                console.log("sign up successfull")
                console.log(user)
            })
            .catch((error) => {
                console.log("sign up error occured. you messed up")
            })
    }

    return (
        <div className="Signup">
            <div className="SignUp__logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="Signup__form">
                <h1>Sign In</h1>
                <button
                    onClick={handleClick} 
                    className="Signup__signinwithgoogle">Sign In with Google 
                    <img src={GoogleImage} alt="Google icon" className="Signup__google-icon" />
                </button>
            </div>
        </div>
    )
}

export default SignUp