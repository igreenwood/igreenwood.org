import styles from './TimelineList.module.css'
import { Timeline } from '../interfaces'
import TimelineItem from './TimelineItem'

type Props = {
    items: Timeline[]
}

export default function TimelineList({ items = [{ id: 1, date: "2020", title: "title", description: "description", hideDate: false }] }: Props) {
    return <ul className={ styles.list }>
        { items.map((item: Timeline) => <li key={ item.id }><TimelineItem id={ item.id } date={ item.date } title={item.title} description={ item.description } hideDate={ item.hideDate } /></li>) }
    </ul>
}