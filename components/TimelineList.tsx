import styles from './TimelineList.module.css'
import { Timeline } from '../interfaces'
import TimelineItem from './TimelineItem'

type Props = {
    items: Timeline[]
}

export default function TimelineList({ items = [{ id: 1, date: "2020", title: "", description: "" }] }: Props) {
    // let lastDate = ""
    // for(const item of items) {
    //     if(item.date == lastDate){
            
    //     } else {
    //         lastDate = item.date
    //     }
    // }
    return <ul className={ styles.list }>
        { items.map((item: Timeline) => <li key={ item.id }><TimelineItem id={ item.id } date={ item.date } title={item.title} description={ item.description } /></li>) }
    </ul>
}