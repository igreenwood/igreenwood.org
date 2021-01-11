import commonStyles from '../styles/utils.module.css';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className={commonStyles.outerContainer}>
      <div className={commonStyles.container}>{children}</div>
    </div>
  );
}
