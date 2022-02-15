import React, { useState } from 'react'
import styles from '../styles/tabUser.module.css'
import Modal from './Modal'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Input from './Input'

import settings from '../settings.json'

const UserRow = ({user, setSuppr, refreshUsers}) => {

    const options = [
        'user', 'valideur','admin'
      ];

    const roleUser = (id,role) => { 
    fetch(`${settings.backendRoute}/api/auth/role/${id}?role=${role}`,{
        method : 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
        }
    })
    .then(res => {
        if (res.ok) {
        return res.json
        } else {
            throw res.statusText
        }
    })
    .then(res => {
        refreshUsers()
    })
    .catch(error => {
        console.log(error)
        refreshUsers()
    })
    }


    return (
        <div className={styles.row}>
            <div className={styles.info}>
            {user.prenom &&<div>{user.prenom}</div>}
            {user.prenom &&<div>{user.nom}</div>}
            <div>{user.email}</div>
            </div>
            <div className={styles.action}>
                <div className={styles.role}><Dropdown options={options} value={user.role} onChange={(e)=> roleUser(user._id,e.value)}/></div>
                <button className='btn btnRed' onClick={(e) => setSuppr(user)}>Supprimer</button>
            </div>
        </div>
    )
}

const TabUsers = ({users, refreshUsers}) => {

    const [suppr,setSuppr] = useState('')

    const [add, setAdd] = useState(false)
    
    const [prenom, setPrenom] = useState('')
    const [nom, setNom] = useState('')
    const [email, setMail] = useState('')

    const createUser = (e) => { 
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/auth/signUp`,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            },
            body : JSON.stringify({
                nom : nom,
                prenom : prenom,
                email : email
            })
        })
        .then(res => {
            if (res.ok) {
            return res.json
            } else {
                throw res.statusText
            }
        })
        .then(res => {
            setAdd(false)
            refreshUsers()
        })
        .catch(error => {
           console.log(error)
        })
    }

    const deleteUser = (e, id) => { 
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/auth/user/${id}`,{
            method : 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            }
        })
        .then(res => {
            if (res.ok) {
            return res.json
            } else {
                throw res.statusText
            }
        })
        .then(res => {
            setSuppr('')
            refreshUsers()
        })
        .catch(error => {
           console.log(error)
        })
    }
    
    return (
        <div className={styles.container}>
            <div className='btnContainer'>
                <button className='btn btnPrimary' onClick={(e)=>setAdd(true)}>Ajouter</button>
            </div>
            <div className={styles.bordered}>
                {users.map( user  => {
                    return (
                        <UserRow user={user} key={user._id} setSuppr={setSuppr} refreshUsers={refreshUsers}/>
                    )
                })}
                <Modal estVisible={suppr!= ''} closeModal={(e) => setSuppr('')}>
                    <div>Etes-vous sur de supprimer l utilisateur {suppr.prenom && suppr.prenom} {suppr.nom && suppr.nom} ?</div>
                    <div className='btnContainer'>
                        <button className='btn btnRed' onClick={e => deleteUser(e,suppr._id)}>Supprimer</button>
                    </div>
                </Modal>
                <Modal estVisible={add} closeModal={(e)=> setAdd(false)}>
                    <Input name='Prénom' value={prenom} onChange={e => setPrenom(e.target.value)}></Input>
                    <Input name='Nom' value={nom} onChange={e => setNom(e.target.value)}></Input>
                    <Input name='mail' value={email} onChange={e => setMail(e.target.value)}></Input>
                    <div className='btnContainer'>
                        <button className='btn btnPrimary' onClick={e => createUser(e)}>Ajouter</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default TabUsers
