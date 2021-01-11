import { Project, ProjectData } from '../interfaces';
import ProjectItem from './ProjectItem';
import styles from './Projects.module.css';

type Props = {
  data: ProjectData;
};

export default function Projects({ data }: Props) {
  let classNameString: string = styles.item;
  const items = data.projects.map((project: Project) => {
    if (project.genre != 'Writing') {
      classNameString = `${styles.item} ${styles.largeGrid}`;
    } else {
      classNameString = styles.item;
    }
    return (
      <li key={project.id} className={classNameString}>
        <ProjectItem project={project} />
      </li>
    );
  });
  return <ul className={styles.container}>{items}</ul>;
}
