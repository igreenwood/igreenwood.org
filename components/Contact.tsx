import styles from './Contact.module.css'
import ExternalLink from './ExternalLink'
import commonStyles from '../styles/utils.module.css'
import { ContactData } from '../interfaces'

type Props = {
    data: ContactData
}

export default function Contact({ data }: Props) {
    return <section className={commonStyles.topMarginedSection}>
        <h2 className={ commonStyles.headingL }>Contact</h2>
        <p className={ styles.contents }>
            <ExternalLink href = { data.githubUrl } label="Github" />
            <ExternalLink href = { data.twitterUrl } label="Twitter" />
            <ExternalLink href = { data.linkedInUrl } label="LinkedIn" />
            <ExternalLink href = { `mailto:${ data.email }` } label="Email" />
        </p>
    </section>
}