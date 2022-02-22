import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Topbar from '../components/Topbar'
import settings from '../settings.json'

import createReport from 'docx-templates'


const Proposition = ({}) => {

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

    const [typeEtude, setType] = useState('')
    const [nomProjet, setNomProjet] = useState('')
    const [numeroEtude, setNumEtude] = useState('')
    const [mandatEtude, setMandatEtude] = useState('')
    const [dateFinPorposition,setDateFinPorposition] = useState('')
    
    const [nomClient, setNomClient] = useState('')
    const [prenomClient, setPrenomClt] = useState('')
    const [mailClient, setMailClient] = useState('')
    const [telClient, setTelClient] = useState('')

    const [nomChef, setNomChef] = useState('')
    const [prenomChef, setPrenomChef] = useState('')
    const [mailChef, setMailChef] = useState('')
    const [telChef, setTelChef] = useState('')

    const download = (path, filename) => {
        // Create a new link
        const anchor = document.createElement('a');
        anchor.href = path;
        anchor.download = filename;
    
        // Append to the DOM
        document.body.appendChild(anchor);
    
        // Trigger `click` event
        anchor.click();
    
        // Remove element from DOM
        document.body.removeChild(anchor);
    }; 
    

    const genererPC = (e) => {
        e.preventDefault()
        let ref = `ETU_${nomClient.substring(0,3).toUpperCase()}_${numeroEtude < 10 ? "0"+numeroEtude : numeroEtude }_${mandatEtude}_PC (Brouillon).pptx`
        fetch(`${settings.backendRoute}/api/proposition/download`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
              },
            body: JSON.stringify({
                typeEtude: typeEtude,
                nomProjet: nomProjet,
                numeroEtude : numeroEtude,
                mandatEtude : mandatEtude,
                dateFinPorposition : dateFinPorposition,
                nomClient : nomClient,
                prenomClient : prenomClient,
                mailClient : mailClient,
                telClient : telClient,
                nomChef : nomChef,
                prenomChef : prenomChef,
                mailChef : mailChef,
                telChef : telChef
            })
        })
        .then(res => res.blob())
        .then(blob => {
            var url = URL.createObjectURL(blob);
            download(url,ref)
        })
    }

    return (
        <>
            <Topbar/>
            <div className='container'>
                <h2>Informations étude</h2>
                <Input name="Type de l'étude" value={typeEtude} onChange={e => setType(e.target.value)}/>
                <Input name="Nom du projet" value={nomProjet} onChange={e => setNomProjet(e.target.value)}/>
                <Input name="Numéro de l'étude" value={numeroEtude} onChange={e => setNumEtude(e.target.value)}/>
                <Input name="Mandat de l'étude" value={mandatEtude} onChange={e => setMandatEtude(e.target.value)}/>
                <Input name="Date de fin de validité (JJ/MM/AAAA)" value={dateFinPorposition} onChange={e => setDateFinPorposition(e.target.value)}/>
                <h2>Information client</h2>
                <Input name="Nom du client" value={nomClient} onChange={e => setNomClient(e.target.value)}/>
                <Input name="Prénom du projet" value={prenomClient} onChange={e => setPrenomClt(e.target.value)}/>
                <Input name="Mail du client" value={mailClient} onChange={e => setMailClient(e.target.value)}/>
                <Input name="Téléphone du client" value={telClient} onChange={e => setTelClient(e.target.value)}/>
                <h2>Information chef de projet</h2>
                <Input name="Nom du chef de projet" value={nomChef} onChange={e => setNomChef(e.target.value)}/>
                <Input name="Prénom du chef de projet" value={prenomChef} onChange={e => setPrenomChef(e.target.value)}/>
                <Input name="Mail du chef de projet" value={mailChef} onChange={e => setMailChef(e.target.value)}/>
                <Input name="Téléphone du chef de projet" value={telChef} onChange={e => setTelChef(e.target.value)}/>
                <div className='btnContainer'>
                    <button className='btn btnPrimary' onClick={genererPC}>
                        Générer la proposition
                    </button>
                </div>
                <br></br>
                <br></br>
            </div>
        </>
    )
}

export default Proposition
