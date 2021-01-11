import { MouseEvent } from 'react'
import { ImageUrl } from '../interfaces'
import styles from './ImageViewer.module.css'

type Props  = {
    isVisible: boolean
    imageUrl: ImageUrl
    hideModal: () => void
}

export default function ImageViewer({ isVisible, imageUrl, hideModal }: Props){
    if(!isVisible){
        return null   
    }

    function onClicked(e: MouseEvent<HTMLElement, globalThis.MouseEvent>) {
        e.preventDefault()
        hideModal()
    }

    return <div className={styles.overlay}>
        <div className={styles.container}>
            <img className={styles.image} src={imageUrl.url} loading="lazy"/>
            <a href="#" className={styles.closeButton} onClick={(e)=> onClicked(e)}>
                <img src="/icons/close-button.svg"/>
            </a>
        </div>
    </div>
}