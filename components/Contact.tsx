import styles from './Contact.module.css'
import ExternalLink from './ExternalLink'
import commonStyles from '../styles/utils.module.css'

type Props = {
    githubUrl: string
    twitterUrl: string
    linkedInUrl: string
    email: string
}

export default function Contact({ githubUrl, twitterUrl, linkedInUrl, email }: Props) {
    return <section className={commonStyles.topMarginedSection}>
        <h2 className={ commonStyles.headingL }>Contact</h2>
        <p className={ styles.contents }>
            <ExternalLink href = { githubUrl } label="Github" />
            <ExternalLink href = { twitterUrl } label="Twitter" />
            <ExternalLink href = { linkedInUrl } label="LinkedIn" />
            <ExternalLink href = { `mailto:${ email }` } label="Email" />
        </p>
    </section>
}