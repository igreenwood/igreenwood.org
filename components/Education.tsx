import TimelineList from "./TimelineList"
import { Timeline } from '../interfaces'
import styles from './Education.module.css'

type Props = {
    items: Timeline[]
}

export default function Education({ items }: Props) {
    return <section>
        <h2 className={ styles.title }>Awards</h2>
        <TimelineList items={ items }/>
    </section>
}