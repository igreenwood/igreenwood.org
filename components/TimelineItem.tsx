import styles from './TimelineItem.module.css'
import { Timeline } from '../interfaces'

export default function TimelineItem({ id, date, title, description="", hideDate=false }: Timeline) {

    let dateClassName: string
    
    if(hideDate){
        dateClassName = `${ styles.date } ${styles.hidden }`
    } else {
        dateClassName = styles.date
    }

    return <section className={ styles.container }>
        <p className={ dateClassName }>
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