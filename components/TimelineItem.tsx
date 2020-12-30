import styles from './TimelineItem.module.css'
import { Timeline } from '../interfaces'

export default function TimelineItem({ id, date, title, description="" }: Timeline) {
    return <section className={ styles.container }>
        <p className={ styles.date }>
            { date }
        </p>
        <div className={ styles.content }>
            <h3 className={styles.title}>
                { title }
            </h3>
            <p className={ styles.description }>
                { description }
            </p>
        </div>
    </section>
}