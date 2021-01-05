import TimelineList from "./TimelineList"
import { EducationData } from '../interfaces'
import styles from './Education.module.css'
import commonStyles from '../styles/utils.module.css'

type Props = {
    data: EducationData
}

export default function Education({ data }: Props) {
    return <section className={commonStyles.topMarginedSection}>
        <h2 className={ commonStyles.headingL }>Education</h2>
        <div className={ styles.container} >
            <TimelineList items={ data.timelines }/>
        </div>
    </section>
}