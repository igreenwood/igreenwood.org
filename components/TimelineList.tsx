import styles from './TimelineList.module.css'
import { Timeline } from '../interfaces'
import TimelineItem from './TimelineItem'

type Props = {
    items: Timeline[]
}

export default function TimelineList({ items }: Props) {
    let formatted: Timeline[] = { ...items }
    let lastDate = ""
    for(const item of formatted) {
        if(item.date == lastDate){
            item.date = ""
        } else {
            lastDate = item.date
        }
    }
    return <ul className={ styles.list }>
        { formatted.map((item: Timeline) => <li key={ item.id }><TimelineItem id={ item.id } date={ item.date } title={item.title} description={ item.description } /></li>) }
    </ul>
}