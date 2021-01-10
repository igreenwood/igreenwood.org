import { MouseEvent } from 'react'
import { ImageUrl } from '../interfaces'
import commonStyles from '../styles/utils.module.css'
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

    function onClicked(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        e.preventDefault()
        hideModal()
    }

    return <div className={commonStyles.modalBackground} onClick={(e)=> onClicked(e)}>
            <img className={ styles.image } src={ imageUrl.url } loading="lazy"/>
    </div>
}