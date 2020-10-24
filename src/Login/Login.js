import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {auth} from '../firebase'

const Login=() =>{
    const history=useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const login=(e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=>{if(auth){history.push('/')}})
        .catch(err=>console.log(err))

    }
    const register=(e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
        if(auth){
            history.push('/')
        }})
        .catch(err=>console.log(err))
    }
    return (
        <div className='login'>
            <Link to='/'>
            <img className='login__logo' 
            src='data:image/png;base64,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' alt='login-logo'/>
            </Link>
            <div className='login__container'>
                <h1>Sign-In</h1>
                <form>
                    <h5>Email</h5>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit' onClick={login} className='login_button'>Sign In</button>
                </form>
                <p>
                    By signing in you agree to the terms and conditions of Amazon
                </p>
                <button type='submit' onClick={register} className='register_button'>Create Your Amazon</button>
            </div>
        </div>
    )
}

export default Login
