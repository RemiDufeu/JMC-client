import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faTimes } from '@fortawesome/free-solid-svg-icons'
import Input from './Input'
import DatePicker from './DatePicker'
import Select from './Select'

import settings from '../settings.json'

const EditBrouillon = ({ proposition, clearEditBrouillon, estVisible }) => {

    const [prenomClient, setPrenomClient] = useState('')
    const [nomClient, setNomClient] = useState('')
    const [titre, setTitre] = useState('')
    const [dateQualification, setDateQualification] = useState('')
    const [nomSociete, setNomSociete] = useState('')
    const [typeEtude, setTypeEtude] = useState('Site vitrine')

    const [urlPC, setUrlPC] = useState('')
    const [CAPropose, setCAPropose] = useState('')

    const [raisonRefus, setRaisonRefus] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        proposition != null && setPropositionData()
    }, [proposition])

    const setPropositionData = () => {
        setPrenomClient(proposition.prenomClient)
        setNomClient(proposition.nomClient)
        setTitre(proposition.titre)
        setDateQualification(proposition.dateQualification)
        setNomSociete(proposition.nomSociete)
        setTypeEtude(proposition.typeEtude)

        let url = proposition.urlPC ? proposition.urlPC : ''
        let CA = proposition.CAPropose ? proposition.CAPropose : ''
        setUrlPC(url)
        setCAPropose(CA)

        let refus = proposition.raisonRefus ? proposition.raisonRefus : ''
        setRaisonRefus(refus)
    }

    const resetPropositionData = () => {
        setPrenomClient('')
        setNomClient('')
        setTitre('')
        setDateQualification('')
        setNomSociete('')
        setTypeEtude('')

        setUrlPC('')
        setCAPropose('')
        
        setRaisonRefus('')
    }

    const closeModal = () => {
        clearEditBrouillon()
        setError('')
    }

    const modifyBrouillon = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/modifyBrouillon/${proposition._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
                titre: titre,
                dateQualification: dateQualification,
                nomClient: nomClient,
                prenomClient: prenomClient,
                nomSociete: nomSociete,
                typeEtude: typeEtude,
                urlPC : urlPC,
                CAPropose : CAPropose
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
                clearEditBrouillon()
            })
            .catch(error => {
                setError(error)
            })
    }

    const placerEnValidation = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/upValidation/${proposition._id}`, {
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
                clearEditBrouillon()
                setError('')
            })
            .catch(error => {
                setError(error)
            })
    }

    const deleteBrouillon = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/${proposition._id}`, {
            method: 'DELETE',
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
                clearEditBrouillon()
            })
            .catch(error => {
                setError(error)
            })
    }

    return (
        <>
            {proposition != null &&
                <Modal estVisible={estVisible} closeModal={closeModal}>
                    <form onSubmit={modifyBrouillon}>
                        <div className='splitForm'>
                            <div>
                                <Input name='Titre de la proposition' value={titre} onChange={e => setTitre(e.target.value)}></Input>
                                <Input name='Nom du client' value={nomClient} onChange={e => setNomClient(e.target.value)}></Input>
                                <Input name='Prénom du client' value={prenomClient} onChange={e => setPrenomClient(e.target.value)}></Input>
                                <Input name='Société du client' value={nomSociete} onChange={e => setNomSociete(e.target.value)} required={false}></Input>
                                <DatePicker name='Date de qualification client' value={dateQualification.substring(0, 10)} onChange={e => setDateQualification(e.target.value)} />
                                <Select value={typeEtude} name="Type d'étude" onChange={e => setTypeEtude(e.target.value)} options={['Site vitrine', 'App mobile', 'App web', 'Power BI', 'E-commerce', 'Etude de marché', 'Autres']} />
                            </div>
                            <div>
                                <Input name="Chiffre d'affaires proposé" value={CAPropose} onChange={e => setCAPropose(e.target.value)}></Input>
                                <Input name='Url de la proposition' value={urlPC} onChange={e => setUrlPC(e.target.value)}></Input>
                                <div style={{"padding":"15px 20px"}}>
                                    <div>Raison du refus</div>
                                    <div style={{"padding":"10px 5px", "backgroundColor": "white", "width": "100%"}}>{raisonRefus}</div>
                                </div>

                            </div>
                        </div>
                        {error && <div className='errorText'>{error}</div>}
                        <div className='btnContainer'>
                            <buton  onClick={deleteBrouillon} className='btn btnRed'>Supprimer</buton>
                            <button type='submit' className='btn btnPrimary'>Modifier</button>
                            <button onClick={placerEnValidation} className='btn btnPrimary'>Placer en validation</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )



}

export default EditBrouillon
