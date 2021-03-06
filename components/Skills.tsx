import React from 'react';
import ImageCard from './ImageCard';
import Chip from '@material-ui/core/Chip';
import styles from './Skills.module.css';
import commonStyles from '../styles/utils.module.css';
import { SkillData } from '../interfaces';

type Props = {
  data: SkillData;
};

export default function Skills({ data }: Props) {
  const cardStyle = { flex: '0 1 40%', marginRight: '1rem', marginTop: '1rem' };
  const chipStyle = {
    color: '#1C1C1C',
    fontFamily: 'WeeklyAlt',
    fontWeight: 400,
    fontSize: '.8rem',
    margin: '.1rem .1rem 0 0',
  };

  return (
    <section className={commonStyles.marginL}>
      <h2 className={commonStyles.headingL}>Skills</h2>
      <div className={`${styles.cardContainer} ${commonStyles.marginS}`}>
        <ImageCard
          key="mainSkill"
          image={'/images/cover6.jpg'}
          title={'Main Skills'}
          style={cardStyle}>
          {data.mainSkill.skills.map((skill) => (
            <Chip
              variant="outlined"
              size="small"
              label={skill.name}
              style={chipStyle}
            />
          ))}
        </ImageCard>
        <ImageCard
          key="subSkill"
          image={'/images/cover2.jpg'}
          title={'Sub Skills'}
          style={cardStyle}>
          {data.subSkill.skills.map((skill) => (
            <Chip
              variant="outlined"
              size="small"
              label={skill.name}
              style={chipStyle}
            />
          ))}
        </ImageCard>
      </div>
    </section>
  );
}
