import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Kanban from '../components/Kanban'
import Topbar from '../components/Topbar'

import settings from '../settings.json'

export default function Home() {

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
          if(res.status > 299 || res.status < 200) {
              router.push('/Login')
          }
      })
  },[])


  return (
    <>
    <Topbar/>
    <Kanban/>
    </>
    
  )
}
