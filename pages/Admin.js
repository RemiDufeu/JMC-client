import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import TabUsers from '../components/TabUsers'
import Topbar from '../components/Topbar'

import settings from '../settings.json'

const Users = () => {

    const router = useRouter()

    useEffect(() => {
        let token = ""
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
                'Authorization': 'Bearer ' + token
            },
        })
            .then(res => {
                if (res.status > 299 || res.status < 200) {
                    router.push('/Login')
                }
            })
            .then(() => {
                getAndSetUsers()
            })
            
    }, [])

    const [users, setUsers] = useState([])

    const getAndSetUsers = () => {
        fetch(settings.backendRoute+'/api/auth/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
        }
        )
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.error) {
                    router.push('/')
                }
                setUsers(res.data)
            })
            .catch(error => {
                console.log(error)
            })

    }


    return (
        <>
            <Topbar/>
            { users && <TabUsers users={users} refreshUsers={getAndSetUsers}/>}
        </>
    )
}

export default Users
