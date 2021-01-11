import React from 'react';
import styles from './Profile.module.css';
import { ProfileData } from '../interfaces';
import Skills from './Skills';
import Awards from './Awards';
import Education from './Education';
import Contact from './Contact';
import Careers from './Careers';
import Container from './Container';
import commonStyles from '../styles/utils.module.css';

type Props = {
  data: ProfileData;
};

export default function Profile({ data }: Props) {
  return (
    <article>
      <figure>
        <img
          src="/images/cover3.jpg"
          className={styles.coverImage}
          loading="lazy"
        />
      </figure>
      <Container>
        <section>
          <h1>
            <div className={commonStyles.headingL}>
              <span className={styles.name}>{data.name}</span> is {data.job}.
            </div>
            <div className={styles.description}>{data.description}</div>
          </h1>
        </section>

        <div className={styles.titleBottomMargin} />

        <Skills data={data.skillData} />

        <Careers data={data.careerData} />

        <Awards data={data.awardData} />

        <Education data={data.educationData} />

        <Contact data={data.contactData} />
      </Container>
    </article>
  );
}
