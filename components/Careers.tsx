import TimelineList from "./TimelineList"
import { CareerData } from '../interfaces'
import styles from './Careers.module.css'
import commonStyles from '../styles/utils.module.css'

type Props = {
    data: CareerData
}

export default function Careers({ data }: Props) {
    return <section className={commonStyles.topMarginedSection}>
        <h2 className={ commonStyles.headingL }>Careers</h2>
        <div className={ styles.container }>
            <TimelineList items={ data.timelines }/>
        </div>
    </section>
}