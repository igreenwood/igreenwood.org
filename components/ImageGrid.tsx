import { ImageUrl } from '../interfaces';
import styles from './ImageGrid.module.css';

type Props = {
  imageUrl: ImageUrl;
};

export default function ImageGrid({ imageUrl }: Props) {
  return (
    <figure>
      <div className={styles.fixedRatioWrapper}>
        <section className={styles.container}>
          <figure>
            <img className={styles.image} src={imageUrl.url} loading="lazy" />
          </figure>
        </section>
      </div>
    </figure>
  );
}
