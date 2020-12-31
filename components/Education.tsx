import TimelineList from "./TimelineList"
import { Timeline } from '../interfaces'
import styles from './Education.module.css'

type Props = {
    items: Timeline[]
}

export default function Education({ items }: Props) {
    return <section>
        <h2 className={ styles.title }>Education</h2>
        <div className={ styles.container} >
            <TimelineList items={ items }/>
        </div>
    </section>
}