import { Project } from '../interfaces'
import styles from './ProjectItem.module.css'
import Link from 'next/link'

type Props = {
    data: Project
}

export default function ProjectItem({ data }: Props) {
    return <article>
        <Link href="/projects/[id]" as={ `/projects/${data.name}` }>
            <a className={ styles.touchHandler }>
                <div className={ styles.fixedRatioWrapper }>
                    <section className={ styles.container }>
                        <figure>
                            <img className={ styles.image } src={ data.coverImageUrl } alt={ data.title }/>
                            <div className={ styles.overlayContainer }>
                                <h2 className={ styles.title }>{ data.title }</h2>
                                <p className={ styles.genre }>{ data.genre }</p>
                            </div>
                        </figure>
                    </section>
                </div>
            </a>
    </Link>
</article>
}