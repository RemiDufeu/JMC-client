import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/topbar.module.css'
import { useRouter } from "next/router";

const Topbar = () => {
    
    const router = useRouter();

    
    const [role, setRole] = useState('')
    useEffect(()=> {
        setRole(JSON.parse(localStorage.getItem('role')))
    },[])

    

    const deconnexion = () => {
        localStorage.removeItem('token')
        router.push('/Login')
    }

    return (
        <div className={styles.barContainer}>
            <div>
                <Link href="/">
                    <a  className={router.pathname == "/" ?  styles.active : ""}>Kanban</a>
                </Link>

                <Link href="/Proposition">
                    <a  className={router.pathname == "/Proposition" ?  styles.active : ""}>Proposition</a>
                </Link>

                { role == 'admin' && <Link href="/Admin">
                    <a  className={router.pathname == "/Admin" ? styles.active : ""}>Admin</a>
                </Link>}
            </div>
            <button className={styles.deco} onClick={deconnexion}>Déconnexion</button>
        </div>
    )
}

export default Topbar
