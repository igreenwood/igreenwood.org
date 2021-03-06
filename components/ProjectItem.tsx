import { Project } from '../interfaces';
import styles from './ProjectItem.module.css';
import Link from 'next/link';

type Props = {
  project: Project;
};

export default function ProjectItem({ project }: Props) {
  return (
    <article>
      <Link href="/projects/[id]" as={`/projects/${project.name}`}>
        <a className={styles.touchHandler}>
          <div className={styles.fixedRatioWrapper}>
            <section className={styles.container}>
              <figure>
                <img
                  className={styles.image}
                  src={project.squareImageUrl.url}
                  alt={project.title}
                  loading="lazy"
                />
                <div className={styles.overlayContainer}>
                  <h2 className={styles.title}>{project.title}</h2>
                  <p className={styles.genre}>{project.genre}</p>
                </div>
              </figure>
            </section>
          </div>
        </a>
      </Link>
    </article>
  );
}
