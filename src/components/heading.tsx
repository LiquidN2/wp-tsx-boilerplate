import { FC } from 'react';
import styles from './heading.module.scss';

const Heading: FC = () => {
  return <h1 className={styles['heading--primary']}>React App</h1>;
};

export default Heading;
