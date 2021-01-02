import { Project } from '../interfaces'
import ProjectItem from './ProjectItem'
import styles from './Projects.module.css'

type Props = {
    projects: Project[]
}

export default function Projects({ projects }: Props) {  

    let classNameString: string = styles.item
    let items = projects.map((project: Project) => 
        {
            if(project.genre == "Android OSS Library"){
                classNameString = `${ styles.item } ${ styles.largeGrid }`
            } else {
                classNameString = styles.item
            }
            return <li key={ project.id } className={ classNameString }><ProjectItem project={ project }/></li>
        }
    )
    return <ul className={ styles.container }>{ items }</ul>
}