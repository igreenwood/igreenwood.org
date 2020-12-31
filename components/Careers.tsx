import TimelineList from "./TimelineList"
import { Timeline } from '../interfaces'
import styles from './Careers.module.css'

type Props = {
    items: Timeline[]
}

export default function Careers({ items }: Props) {
    return <section>
        <h2 className={ styles.title }>Careers</h2>
        <div className={ styles.container }>
            <TimelineList items={ items }/>
        </div>
    </section>
}