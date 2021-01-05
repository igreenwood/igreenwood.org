import TimelineList from "./TimelineList"
import { Timeline } from '../interfaces'
import styles from './Awards.module.css'
import commonStyles from '../styles/utils.module.css'

type Props = {
    items: Timeline[]
}

export default function Awards({ items }: Props) {
    return <section className={commonStyles.topMarginedSection}>
        <h2 className={ commonStyles.headingL }>Awards</h2>
        <div className={ styles.container} >
            <TimelineList items={ items }/>
        </div>
    </section>
}