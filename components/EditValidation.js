import React, { useEffect, useState } from 'react'
import Modal from './Modal'

import Input from './Input'
import DatePicker from './DatePicker'
import Select from './Select'

import settings from '../settings.json'

const EditValidation = ({ proposition, clearEditValidation, estVisible }) => {

    const [prenomClient, setPrenomClient] = useState('')
    const [nomClient, setNomClient] = useState('')
    const [titre, setTitre] = useState('')
    const [dateQualification, setDateQualification] = useState('')
    const [nomSociete, setNomSociete] = useState('')
    const [typeEtude, setTypeEtude] = useState('Site vitrine')

    const [urlPC, setUrlPC] = useState('')
    const [CAPropose, setCAPropose] = useState('')

    const [raisonRefus, setRaisonRefus] = useState('')

    const [valideur1, setValideur1] = useState('')

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

        let valideur = proposition.valideur1 ? proposition.valideur1 : 'aucun'
        setValideur1(valideur)
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
    }

    const closeModal = () => {
        clearEditValidation()
        setError('')
    }


    const refuserBrouillon = (e) => {
        e.preventDefault();
        fetch(`${settings.backendRoute}/api/proposition/validation/${proposition._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
                
            },
            body: JSON.stringify({
                estAccepte : false,
                raisonRefus : raisonRefus
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
                clearEditValidation()
                setError('')
            })
            .catch(error => {
                setError(error)
            })
    }

    const validerBrouillon = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/api/proposition/validation/${proposition._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
                estAccepte : true
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
                clearEditValidation()
                setError(null)
            })
            .catch(error => {
                setError("erreur de validation")
            })
    }

    

    return (
        <>
            {proposition != null &&
                <Modal estVisible={estVisible} closeModal={closeModal}>
                    <form>
                        <div className='splitForm'>
                            <div>
                                <Input name='Titre de la proposition' disabled={true} value={titre} onChange={e => setTitre(e.target.value)}></Input>
                                <Input name='Nom du client' disabled={true} value={nomClient} onChange={e => setNomClient(e.target.value)}></Input>
                                <Input name='Prénom du client' disabled={true} value={prenomClient} onChange={e => setPrenomClient(e.target.value)}></Input>
                                <Input name='Société du client' disabled={true} value={nomSociete} onChange={e => setNomSociete(e.target.value)} required={false}></Input>
                                <DatePicker name='Date de qualification client' disabled={true} value={dateQualification.substring(0, 10)} onChange={e => setDateQualification(e.target.value)} />
                                <Select value={typeEtude} name="Type d'étude" disabled={true} onChange={e => setTypeEtude(e.target.value)} options={['Site vitrine', 'App mobile', 'App web', 'Power BI', 'E-commerce', 'Etude de marché', 'Autres']} />
                            </div>
                            <div>
                                <Input name="Chiffre d'affaires proposé" disabled={true} value={CAPropose} onChange={e => setCAPropose(e.target.value)}></Input>
                                <div style={{"padding":"15px 20px"}}>
                                    <div style={{"padding":"0px 0 5px"}}>Url de la proposition</div>
                                    <a href={urlPC} target='_blank' rel="noreferrer">{urlPC}</a>
                                </div>
                                <Input name="Raison du refus" value={raisonRefus} onChange={e => setRaisonRefus(e.target.value)}></Input>
                                <div style={{"padding":"15px 20px"}}>
                                    <div>Valideur 1</div>
                                    <div style={{"padding":"10px 5px", "width": "100%", 'fontWeight': "bold"}}>{valideur1}</div>
                                </div>
                            </div>
                        </div>
                        {error && <div className='errorText'>{error}</div>}
                        <div className='btnContainer'>
                            <buton  onClick={refuserBrouillon} className='btn btnRed'>Refuser</buton>
                            <button onClick={validerBrouillon} className='btn btnPrimary'>Valider</button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )



}

export default EditValidation
