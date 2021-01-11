import TimelineList from './TimelineList';
import { AwardData } from '../interfaces';
import styles from './Awards.module.css';
import commonStyles from '../styles/utils.module.css';

type Props = {
  data: AwardData;
};

export default function Awards({ data }: Props) {
  return (
    <section className={commonStyles.marginL}>
      <h2 className={commonStyles.headingL}>Awards</h2>
      <div className={`${styles.container} ${commonStyles.marginM}`}>
        <TimelineList items={data.timelines} />
      </div>
    </section>
  );
}
