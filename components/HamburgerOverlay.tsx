import Link from 'next/link'
import styles from './HamburgerOverlay.module.css'

type Props = {
    isVisible: boolean
    onClick: ()=> void
}

export default function HamburgerOverlay({ isVisible, onClick }: Props){
    if(!isVisible){
        return null;
    }

    return <div className={styles.container}>
    <ul className={styles.listWrapper}>
        <li>
            <Link href="/">
                <a onClick={()=> onClick()}>Projects</a>
            </Link>
        </li>
        <li>
            <Link href="/info">
                <a onClick={()=> onClick()}>Info</a>
            </Link>
        </li>
        <li>
            <Link href="/posts">
                <a onClick={()=> onClick()}>Posts</a>
            </Link>
        </li>
    </ul>
</div>
}