import React from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard'
import authScreenAtom from '../atoms/authAtoms';
import { useRecoilValue } from 'recoil';

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    console.log(authScreenState);
    return (
    <>
    {
        authScreenState === "login" ? <LoginCard /> : <SignupCard />
    }
    </>
  )
}

export default AuthPage
