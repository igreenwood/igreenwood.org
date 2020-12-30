import styles from './ExternalLink.module.css'

type Props = {
    href: string
    label: string
}

export default function ExternalLink({ href, label }: Props) {
    return <a
    className={ styles.link }
    href={ href }
    rel="nofollow noreferrer"
    target="_blank">
        { label }
    </a>
}