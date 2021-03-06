import { Project } from '../interfaces';
import styles from './ProjectDetail.module.css';
import Container from './Container';
import commonStyles from '../styles/utils.module.css';
import { format } from '../utils/date-util';
import ImageGrid from './ImageGrid';
import { ImageUrl } from '../interfaces';

type Props = {
  project: Project;
  showModal: (imageUrl: ImageUrl) => void;
};

export default function ProjectDetail({ project, showModal }: Props) {
  const parsedDate = format({ dateString: project.date });

  function onImageClicked(imageUrl: ImageUrl) {
    showModal(imageUrl);
  }

  return (
    <article>
      <figure>
        <div className={styles.fixedRatioWrapper}>
          <div className={styles.imageContainer}>
            <img
              className={styles.coverImage}
              src={project.coverImageUrl.url}
              loading="lazy"
            />
          </div>
        </div>
      </figure>
      <Container>
        <section>
          <div>
            <h2 className={`${commonStyles.headingXL} ${styles.title}`}>
              {project.title}
            </h2>
          </div>
          <div className={styles.topSection}>
            <div className={styles.twoColumnBlock}>
              <div className={styles.attributesContainer}>
                <p>
                  <span className={styles.attributeLabel}>DATE:</span>
                  <span className={`${styles.date} ${styles.attributeBody}`}>
                    {parsedDate}
                  </span>
                </p>
                <p>
                  <span className={styles.attributeLabel}>GENRE:</span>
                  <span className={`${styles.genre} ${styles.attributeBody}`}>
                    {project.genre}
                  </span>
                </p>
              </div>
              <p className={`${commonStyles.headingM} ${styles.description}`}>
                {project.description}
              </p>
            </div>
          </div>
          <div className={commonStyles.marginL}>
            <ul className={styles.linkList}>
              {project.links?.map((link) => {
                return (
                  <li>
                    <a href={link} className={styles.link}>
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={commonStyles.marginL}>
            <ul className={styles.gridContainer}>
              {project.imageUrls?.map((imageUrl, index) => {
                return (
                  <li key={index} className={styles.grid}>
                    <a href="#" onClick={() => onImageClicked(imageUrl)}>
                      <ImageGrid imageUrl={imageUrl} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={commonStyles.marginL}>
            <div className={styles.twoColumnBlock}>
              <div className={styles.attributesContainer}>
                <p>
                  <span className={styles.attributeLabel}>PART:</span>
                  <span className={`${styles.part} ${styles.attributeBody}`}>
                    {project.part}
                  </span>
                </p>
                <p>
                  <span className={styles.attributeLabel}>TOOLS:</span>
                  <span className={`${styles.tools} ${styles.attributeBody}`}>
                    {project.tools}
                  </span>
                </p>
              </div>
              <p className={`${commonStyles.headingM} ${styles.note}`}>
                {project.note}
              </p>
            </div>
          </div>
          <div className={`${commonStyles.marginL} ${styles.videoContainer}`}>
            {
              project.videoUrls?.map((videoUrl) => {
                return (
                  <video
                    src={videoUrl.url}
                    className={styles.video}
                    preload="none"
                    controls
                    loop
                    autoPlay
                    muted
                    playsInline
                    poster={project.posterUrl?.url}
                  />
                );
              })[0]
            }
          </div>
        </section>
      </Container>
    </article>
  );
}
