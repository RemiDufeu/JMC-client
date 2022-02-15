import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faTimes } from '@fortawesome/free-solid-svg-icons'
import Input from './Input'
import DatePicker from './DatePicker'
import Select from './Select'

import settings from '../settings.json'

const EditEnvoye = ({ proposition, clearEditEnvoye, estVisible }) => {

    const [dateReponse, setDateReponse] = useState('')
    const [raisonRefusClient, setRaisonRefusClient] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        proposition != null && setPropositionData()
    }, [proposition])

    const setPropositionData = () => {
        let dateDeReponse = proposition.dateReponse ? proposition.dateReponse : ''
        setDateReponse(dateDeReponse)
    }

    const resetPropositionData = () => {
        setDateReponse('')
    }

    const closeModal = () => {
        clearEditEnvoye()
        setError('')
    }

   
    const accepte = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/accepte/${proposition._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
                dateReponse : dateReponse
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
                clearEditEnvoye()
                setError('')
            })
            .catch(error => {
                setError(error)
            })
    }

    const refuse = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/refuse/${proposition._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
                dateReponse : dateReponse,
                raisonRefusClient : raisonRefusClient
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
                clearEditEnvoye()
            })
            .catch(error => {
                setError(error)
            })
    }

    const retrograder = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/downAEnvoyer/${proposition._id}`, {
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
                clearEditEnvoye()
            })
            .catch(error => {
                setError(error)
            })
    }

    

    return (
        <>
            {proposition != null &&
                <Modal estVisible={estVisible} closeModal={closeModal}>
                    <form>
                            <div>
                                <DatePicker name="Date de réponse du client" value={dateReponse.substring(0, 10)} onChange={e => setDateReponse(e.target.value)} />
                                <Input name="Raison de refus du client" value={raisonRefusClient} onChange={e => setRaisonRefusClient(e.target.value)} />
                            </div>
                        {error && <div className='errorText'>{error}</div>}
                        <div className='btnContainer'>
                            <buton onClick={retrograder} className='btn btnRed'>Rétrograder</buton>
                            <button onClick={refuse} className='btn btnPrimary'>PC Refusé</button>
                            <button onClick={accepte} className='btn btnPrimary'>PC Accepté</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )



}

export default EditEnvoye
