import TimelineList from "./TimelineList"
import { Timeline } from '../interfaces'
import styles from './Awards.module.css'

type Props = {
    items: Timeline[]
}

export default function Awards({ items }: Props) {
    return <section>
        <h2 className={ styles.title }>Awards</h2>
        <TimelineList items={ items }/>
    </section>
}