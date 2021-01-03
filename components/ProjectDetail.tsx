import { Project } from '../interfaces'
import styles from './ProjectDetail.module.css'

type Props = {
    project: Project
}

export default function ProjectDetail({ project }: Props) {
    return <section>
        <figure>
            <div className={ styles.fixedRatioWrapper }>
                <div className={ styles.imageContainer }>
                    <img className={ styles.coverImage } src={ project.coverImageUrl }/>
                </div>
            </div>
        </figure>
        <div className={ styles.container }>
            <h2 className={ styles.title }>{ project.title }</h2>
            <article>
                <div className={ styles.subtitleContainer }>
                    <span className={ styles.date }>DATE: { project.date }</span><span className={ styles.genre }>GENRE: { project.genre }</span>
                </div>
                <div className={ styles.description }>{ project.description }</div>
            </article>
        </div>
    </section>
}