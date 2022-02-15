import React from 'react'
import styles from '../styles/modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faPlusCircle, faTimes  } from '@fortawesome/free-solid-svg-icons'

const Modal = ({estVisible, children, closeModal}) => {
    return (
        <div className={ (estVisible ? styles.modalContainer : styles.invisible)} >
            <div className={styles.modalContent}>
                <button className={styles.fixedTopRightBtn} onClick={(e)=> {closeModal()}}>
                    <FontAwesomeIcon icon={fas, faTimes } size="lg" className='colorGrey'/>
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
