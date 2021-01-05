import TimelineList from "./TimelineList"
import { Timeline } from '../interfaces'
import styles from './Education.module.css'
import commonStyles from '../styles/utils.module.css'

type Props = {
    items: Timeline[]
}

export default function Education({ items }: Props) {
    return <section className={commonStyles.topMarginedSection}>
        <h2 className={ commonStyles.headingL }>Education</h2>
        <div className={ styles.container} >
            <TimelineList items={ items }/>
        </div>
    </section>
}