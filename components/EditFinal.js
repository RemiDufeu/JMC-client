import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import settings from '../settings.json'

const EditFinal = ({ proposition, clearEditFinal, estVisible }) => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const closeModal = () => {
        clearEditFinal()
        setError('')
    }

    const retrograder = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/downEnvoye/${proposition._id}`, {
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
                clearEditFinal()
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
                        {error && <div className='errorText'>{error}</div>}
                        <div style={{"textAlign": "center"}}>
                            <buton onClick={retrograder} className='btn btnRed'>Rétrograder</buton>
                        </div>
                </Modal>
            }
        </>
    )



}

export default EditFinal
