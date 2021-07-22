import React from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@material-ui/core';

interface AppProductCardComponent {}
const AppProductCardComponent: React.FC<AppProductCardComponent> = ({}) => {
  // styles
  const classes = useStyles();
  // isHover state
  const [isHover, setIsHover] = React.useState<boolean>(false);
  return (
    <div
      className={classes.root}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        src="/images/dog.png"
        alt="Picture of the author"
        layout="fill"
        objectFit="cover"
        className={classes.image}
      />
      <button className={`${classes.cartBtn} ${isHover && classes.isHover}`}>
        ADD TO CART
      </button>
    </div>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '3rem 0px',
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    image: {
      cursor: 'pointer',
    },
    cartBtn: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      left: 0,
      right: 0,
      border: 'none',
      padding: '0.5rem 0rem',
      fontSize: '90%',
      background: '#000000',
      color: '#fff',
      letterSpacing: '0.07em',
      lineHeight: '25px',
      display: 'none',
      cursor: 'pointer',
      transition: 'all 0.5s',
    },
    isHover: {
      display: 'inline-block',
    },
  })
);
export default AppProductCardComponent;
