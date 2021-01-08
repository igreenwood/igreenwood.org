import styles from './TimelineList.module.css'
import { Timeline, TimelineWrapper } from '../interfaces'
import TimelineItem from './TimelineItem'

type Props = {
    items: Timeline[]
}

export default function TimelineList({ items }: Props) {
    // dateが同じ場合最初のものだけを表示する
    let wrappers: TimelineWrapper[] = new Array()
    let lastDate = ""
    for(let item of items) {
        let showDate = true
        if(item.date == lastDate){
            showDate = false
        }
        wrappers.push({ timeline: item, showDate: showDate })
    }
    return <ul className={ styles.list }>
        { wrappers.map((item: TimelineWrapper) => <li key={ item.timeline.index }><TimelineItem timeline={item.timeline} showDate={ item.showDate } /></li>) }
    </ul>
}