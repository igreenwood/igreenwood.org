import styles from './HamburgerMenu.module.css';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerMenu({ isOpen, onClick }: Props) {
  let className;
  if (isOpen) {
    className = `${styles.button} ${styles.open}`;
  } else {
    className = `${styles.button} ${styles.closed}`;
  }
  return (
    <div className={styles.container}>
      <button type="button" className={className} onClick={() => onClick()}>
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}
