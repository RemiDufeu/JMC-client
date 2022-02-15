import React, { useState } from 'react'
import styles from '../styles/kanbancard.module.css'



const KanbanCard = ({propositionData, role="default", onClick}) => {

    const convertToFrDate = (date) => {
        let year = date.substring(0,4)
        let month = date.substring(5,7)
        let dt = date.substring(8,10)
        return (dt+"/"+month+"/"+year)
    }

    const getEtapeValidation = () => {
        if(propositionData.valideur2 && propositionData.valideur2!= null) {
            return 2
        } else if (propositionData.valideur1 && propositionData.valideur1!= null) {
            return 1
        } 
        return 0
    }

    const [isDrag,setIsDrag] = useState(false)

    return (
        <div className={isDrag ? styles.activeCardContainer:styles.cardContainer} onClick={onClick}>
            <div className={styles.titre}>{propositionData.titre}</div>
            <hr></hr>
            <div>{propositionData.nomClient.toUpperCase()} {propositionData.prenomClient}</div>
            <div>{propositionData.nomSociete && propositionData.nomSociete}</div>
            {propositionData.urlPC && <div><a href={propositionData.urlPC} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>lien du doc</a></div>}
            <div>{convertToFrDate(propositionData.dateQualification)}</div>
            <div className={getEtapeValidation() === 0 ?styles.validationBadge : getEtapeValidation() === 1 ? styles.validationBadge1 : styles.validationBadge2}>Validation {getEtapeValidation()}/2</div>
            {propositionData.statut == 'Accepté' && <div className={styles.finalBadgeAccepte}>Accepté</div>}
            {propositionData.statut == 'Refusé' && <div className={styles.finalBadgeRefuse}>Refusé</div> }
        </div>
    )
}

export default KanbanCard
