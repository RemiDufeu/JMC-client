import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faTimes } from '@fortawesome/free-solid-svg-icons'
import Input from './Input'
import DatePicker from './DatePicker'
import Select from './Select'

import settings from '../settings.json'

const EditAEnvoyer = ({ proposition, clearEditAEnvoyer, estVisible }) => {

    const [dateEnvoyé, setDateEnvoyé] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        proposition != null && setPropositionData()
    }, [proposition])

    const setPropositionData = () => {

        let dateEnvoi = proposition.dateEnvoi ? proposition.dateEnvoi : ''
        setDateEnvoyé(dateEnvoi)
    }

    const resetPropositionData = () => {
        setDateEnvoyé('')
    }

    const closeModal = () => {
        clearEditAEnvoyer()
        setError('')
    }

   
    const placerEnEnvoyer = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/upEnvoye/${proposition._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
                dateEnvoie : dateEnvoyé
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
                setSuccess(res.message)
                resetPropositionData()
                clearEditAEnvoyer()
            })
            .catch(error => {
                setError(error)
            })
    }

    const retrograder = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/downEnValidation/${proposition._id}`, {
            method: 'PUT',
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
                setSuccess(res.message)
                resetPropositionData()
                clearEditAEnvoyer()
                setError('')
            })
            .catch(error => {
                setError(error)
            })
    }

    

    return (
        <>
            {proposition != null &&
                <Modal estVisible={estVisible} closeModal={closeModal}>
                    <form onSubmit={placerEnEnvoyer}>
                            <div>
                                <DatePicker name="Date d'envoi de la proposition" value={dateEnvoyé.substring(0, 10)} onChange={e => setDateEnvoyé(e.target.value)} />
                            </div>
                        {error && <div className='errorText'>{error}</div>}
                        <div className='btnContainer'>
                            <buton onClick={retrograder} className='btn btnRed'>Rétrograder</buton>
                            <button type='submit' className='btn btnPrimary'>Placer en envoyé</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )



}

export default EditAEnvoyer
