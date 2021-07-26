import React from 'react';
import { Grid, makeStyles, createStyles } from '@material-ui/core';
import AppProductCardComponent from './AppProductCardComponent';
import { Details, Images } from '../utils/interfaces';

interface AppRecommendationInterface {
  details?: Details | null;
}
const AppRecommendationComponent: React.FC<AppRecommendationInterface> = ({
  details,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      spacing={4}
      justifyContent="space-between"
    >
      <Grid item xs={12}>
        <h3 className="bold_text">People also buy</h3>
      </Grid>
      {details?.recommendations?.map((item, index) => (
        <React.Fragment key={index}>
          <Grid item xs={4}>
            <div className={classes.productCardWrapper}>
              <AppProductCardComponent img={item as Images} />
            </div>
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        <div className="details_wrapper">
          <h3 className="bold_text">Details</h3>
          <p className="light_text">
            Size:
            {`${details?.dimmentions?.height} x ${details?.dimmentions?.width} pixel`}
          </p>
          <p className="light_text">
            Size:
            {`${details?.size} Bytes`}
          </p>
        </div>
      </Grid>
    </Grid>
  );
};
// styles
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      //   flexGrow: 1,
      transition: 'all 0.5s',
      textAlign: 'right',
      [theme.breakpoints.down('md')]: {
        textAlign: 'left',
      },
    },
    cartIcon: {
      float: 'left',
    },
    productCardWrapper: {
      height: '100%',
      minHeight: '14rem',
    },
  })
);
export default AppRecommendationComponent;
