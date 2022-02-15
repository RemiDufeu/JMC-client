import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import styles from '../styles/login.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo_JMC_Nice from "../public/Logo_JMC_Nice.png";

import settings from '../settings.json'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    

    const router = useRouter()

    useEffect(() => {
        let token =""
        try {
            token = JSON.parse(localStorage.getItem('token'))
        } catch (error) {
            console.error(error)
        }
        fetch(`${settings.backendRoute}/api/auth/signInToken`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ token
            },
        })
        .then(res => {
            if(res.status <= 299 && res.status >= 200) {
                router.push('/')
            }
        })
    },[])

    const login = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/auth/signIn`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(res => res.json())
            .then(res => {  
                if (!res.error) {
                    localStorage.setItem('token',JSON.stringify(res.token))
                    localStorage.setItem('role',JSON.stringify(res.userRole))
                    setError('')
                    router.push('/')
                } else {
                    setError(res.error)
                }
            })
            .catch(error => {
                setError(error)
            })
    }

    const mdpOublie = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={login}>
                <div className={styles.logoContainer}>
                <Image src={Logo_JMC_Nice} alt='logoJMC' width={186.5} height={50} />
                </div>
                <Input name="Email" value={email} onChange={(e => {setEmail(e.target.value)})}/>
                <Input name="Mot de passe" type="password" value={password} onChange={(e => {setPassword(e.target.value)})}/>
                <a style={{float : "right", paddingRight : "20px", cursor : "pointer"}} onClick={(e)=> console.log("ok")}>Mot de passe oublié ?</a>
                {error && <div className='errorText'>{error}</div>}
                <div className={styles.btnContainer}>
                    <button className='btn btnPrimary' type='submit'>Se connecter</button>
                </div>
            </form>
        </div>
    )
}

export default Login
