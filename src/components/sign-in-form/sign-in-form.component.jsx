import { useState } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.style.scss';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);    
  }
  
  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          break;
        case 'auth/cancelled-popup-request':
          break;
        default:
          console.log(error);
          break;
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert("incorrect password for email");
          break;
        case 'auth/uesr-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }

      if (error.code === "auth/wrong-password") {
        alert("incorrect password for email");
      } else if (error.code = "auth/uesr-not-found") {

      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }


  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions = {{
            type:"email",
            required:true  ,
            onChange:handleChange, 
            name:"email" ,
            value:email
          }}
        />

        <FormInput
          label="Password"
          inputOptions = {{
            type:"password",
            required:true,
            onChange:handleChange, 
            name:"password",
            value:password
          }}
        />

        <div className="buttons-container">
          <Button type="submit" children="Sign in"/>
          <Button type="button" buttonType="google" onClick={signInWithGoogle} children="Google sign in"/>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;