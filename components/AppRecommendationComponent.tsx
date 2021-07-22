import React from 'react';
import { Grid, makeStyles, createStyles } from '@material-ui/core';
import AppProductCardComponent from './AppProductCardComponent';
import { Details } from '../utils/interfaces';

interface AppRecommendationInterface {
  details?: Details;
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
      {[1, 2, 3].map((item, index) => (
        <>
          <Grid item xs={4} key={index}>
            <div className={classes.productCardWrapper}>
              <AppProductCardComponent />
            </div>
          </Grid>
        </>
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
