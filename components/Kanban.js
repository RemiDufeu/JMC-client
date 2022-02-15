import KanbanCard from "../components/kanbanCard";
import styles from "../styles/kanbancard.module.css";
import { useEffect, useState } from "react";

import CreatePC from "../components/CreatePC"
import EditBrouillon from "./EditBrouillon";
import EditAEnvoyer from "./EditAEnvoyer";
import EditEnvoye from "./EditEnvoye";
import EditFinal from "./EditFinal";
import EditValidation from "./EditValidation";

import settings from '../settings.json'

export default function Kanban() {

    const [propositions, setPropositions] = useState([])

    const getAndSetPropositions = () => {
        console.log()
        fetch(`${settings.backendRoute}/api/proposition`,{
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ JSON.parse(localStorage.getItem('token'))
        }}
        )
            .then(res => {
                return res.json()
            })
            .then(res => {
                setPropositions(res.data)
            })
    }

    const clearEditBrouillon = () => {
        getAndSetPropositions()
        setEditBrouillon(null)
    }

    const clearEditValidation = () => {
        getAndSetPropositions()
        setEditValidation(null)
    }

    const clearEditAEnvoyer = () => {
        getAndSetPropositions()
        setEditAEnvoyer(null)
    }

    const clearEditEnvoye = () => {
        getAndSetPropositions()
        setEditEnvoye(null)
    }

    const clearEditFinal = () => {
        getAndSetPropositions()
        setEditFinal(null)
    }

    useEffect(() => {
        getAndSetPropositions()
    }, [])

    const [editBrouillon, setEditBrouillon] = useState(null)
    const [editValidation, setEditValidation] = useState(null)
    const [editAEnvoyer, setEditAEnvoyer] = useState(null)
    const [editEnvoye, setEditEnvoye] = useState(null)
    const [editFinal, setEditFinal] = useState(null)


    return (
        <div className={styles.colonnesContainer}>
            {propositions && <>
            <div>
            <div className={styles.colonneTitle}>Brouillon</div>
            <div className={styles.colonne}>
                {propositions.filter(proposition => proposition.statut == 'Brouillon').map(proposition => {
                    return <KanbanCard key={proposition._id} propositionData={proposition} onClick={(e) => {setEditBrouillon(proposition)}}/>
                })}
            </div>
        </div>
        <div>
            <div className={styles.colonneTitle}>En validation</div>
            <div className={styles.colonne}>
                {propositions.filter(proposition => proposition.statut == 'Validation').map(proposition => {
                    return <KanbanCard key={proposition._id} propositionData={proposition} onClick={(e) => {setEditValidation(proposition)}}/>
                })}
            </div>
        </div>
        <div>
            <div className={styles.colonneTitle}>A envoyer</div>
            <div className={styles.colonne}>
                {propositions.filter(proposition => proposition.statut == 'AEnvoyer').map(proposition => {
                    return <KanbanCard key={proposition._id} propositionData={proposition} onClick={(e) => {setEditAEnvoyer(proposition)}}/>
                })}
            </div>
        </div>
        <div>
            <div className={styles.colonneTitle}>Attente de réponse</div>
            <div className={styles.colonne}>
                {propositions.filter(proposition => proposition.statut == 'Envoyé').map(proposition => {
                    return <KanbanCard key={proposition._id} propositionData={proposition} onClick={(e) => {setEditEnvoye(proposition)}}/>
                })}
            </div>
        </div>
        <div>
            <div className={styles.colonneTitle}>Statut final</div>
            <div className={styles.colonne} >
                {propositions.filter(proposition => proposition.statut == 'Accepté' || proposition.statut == 'Refusé').map(proposition => {
                    return <KanbanCard key={proposition._id} propositionData={proposition} onClick={(e) => {setEditFinal(proposition)}}/>
                })}
            </div>
        </div>
        <CreatePC refreshKanban={getAndSetPropositions} />
        <EditBrouillon clearEditBrouillon={clearEditBrouillon} proposition={editBrouillon} estVisible={editBrouillon!=null}/>
        <EditAEnvoyer clearEditAEnvoyer={clearEditAEnvoyer} proposition={editAEnvoyer} estVisible={editAEnvoyer!=null}/>
        <EditEnvoye clearEditEnvoye={clearEditEnvoye} proposition={editEnvoye} estVisible={editEnvoye!=null}/>
        <EditFinal clearEditFinal={clearEditFinal} proposition={editFinal} estVisible={editFinal!=null}/>
        <EditValidation clearEditValidation={clearEditValidation} proposition={editValidation} estVisible={editValidation!=null}/>
        </>}
            
        </div>
    );
}
