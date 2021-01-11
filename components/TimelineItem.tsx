import styles from './TimelineItem.module.css';
import { TimelineWrapper } from '../interfaces';

export default function TimelineItem({ timeline, showDate }: TimelineWrapper) {
  let dateClassName: string;

  if (showDate) {
    dateClassName = styles.date;
  } else {
    dateClassName = `${styles.date} ${styles.hidden}`;
  }

  return (
    <section className={styles.container}>
      <p className={dateClassName}>{timeline.date}</p>
      <div className={styles.content}>
        <h3 className={styles.title}>{timeline.title}</h3>
        <p className={styles.description}>{timeline.description}</p>
      </div>
    </section>
  );
}
