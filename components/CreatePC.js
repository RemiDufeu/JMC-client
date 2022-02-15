import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faPlusCircle, faTimes  } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'
import Input from './Input'
import Select from './Select'
import DatePicker from './DatePicker'
import styles from '../styles/modal.module.css'

import settings from '../settings.json'

const CreatePC = ({refreshKanban}) => {

    const [estVisible, setVisible] = useState(false)
    
    const [prenomClient,setPrenomClient] = useState('')
    const [nomClient,setNomClient] = useState('')
    const [titre,setTitre] = useState('')
    const [dateQualification,setDateQualification] = useState('')
    const [nomSociete,setNomSociete] = useState('')
    const [typeEtude,setTypeEtude] = useState('Site vitrine')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const cleanForm = () => {
        setPrenomClient('')
        setNomClient('')
        setTitre('')
        setDateQualification('')
        setNomSociete('')
        setTypeEtude('Site vitrine')
    }



    const createProposition = (e) => {
        e.preventDefault();
        fetch(settings.backendRoute+'/api/proposition',{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
              },
            body : JSON.stringify({
                titre : titre,
                dateQualification : dateQualification,
                nomClient : nomClient,
                prenomClient : prenomClient,
                nomSociete : nomSociete,
                typeEtude : typeEtude,
                dateCreation : Date.now()
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
            cleanForm()
            setError(false)
            setVisible(false)
            refreshKanban()
        })
        .catch(error => {
            setError(error)
        })
    }


    return (
        <>
            <button className='fixedBtn' onClick={(e) => { setVisible(true)}}>
                <FontAwesomeIcon icon={fas, faPlusCircle } size="5x" className='colorPrimary'/>
            </button>
            <Modal estVisible={estVisible} setVisible={setVisible} closeModal={(e => setVisible(false))}>
                <form onSubmit={createProposition}>
                    <Input name='Titre de la proposition' value={titre} onChange={e => setTitre(e.target.value)}></Input>
                    <Input name='Nom du client' value={nomClient} onChange={e => setNomClient(e.target.value)}></Input>
                    <Input name='Prénom du client' value={prenomClient} onChange={e => setPrenomClient(e.target.value)}></Input>
                    <Input name='Société du client' value={nomSociete} onChange={e => setNomSociete(e.target.value)} required={false}></Input>
                    <DatePicker name='Date de qualification client' value={dateQualification} onChange={e => setDateQualification(e.target.value)} />
                    <Select value={typeEtude} name="Type d'étude" onChange={e => setTypeEtude(e.target.value)} options={['Site vitrine','App mobile','App web','Power BI','E-commerce','Etude de marché','Autres']}/>
                    { error && <div className='errorText'>{error}</div>}
                    <div className='btnContainer'>
                        <button type='submit' className='btn btnPrimary'>Créer</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default CreatePC