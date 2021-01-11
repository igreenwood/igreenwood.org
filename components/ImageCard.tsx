import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

type Props = {
  children?: ReactNode;
  image: string;
  title: string;
  style?: React.CSSProperties;
};

const useStyles = makeStyles({
  root: {
    minWidth: '260px',
    height: '260px',
  },
});

export default function ImageCard({ children, image, title, style }: Props) {
  const classes = useStyles();
  const cardTitleStyle = {
    color: '#1C1C1C',
    backgroundColor: '#FFFFFB',
    fontFamily: 'WeeklyAlt',
    fontWeight: 500,
    fontSize: '1.25rem',
    margin: '.0 0 .5rem',
  };
  return (
    <Card className={classes.root} style={style}>
      <CardMedia
        component="img"
        alt="Skill Card"
        image={image}
        style={{ height: '108px' }}
      />
      <CardContent>
        <Typography variant="h5" component="h3" style={cardTitleStyle}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
