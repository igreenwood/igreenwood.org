import TimelineList from "./TimelineList"
import { Timeline } from '../interfaces'
import styles from './Careers.module.css'
import commonStyles from '../styles/utils.module.css'

type Props = {
    items: Timeline[]
}

export default function Careers({ items }: Props) {
    return <section className={commonStyles.topMarginedSection}>
        <h2 className={ commonStyles.headingL }>Careers</h2>
        <div className={ styles.container }>
            <TimelineList items={ items }/>
        </div>
    </section>
}