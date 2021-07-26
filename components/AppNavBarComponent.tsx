import React from 'react';
import Image from 'next/image';
import { IconButton, makeStyles, createStyles } from '@material-ui/core';
interface AppNavBarInterface {}

const AppNavBarComponent: React.FC<AppNavBarInterface> = ({}) => {
  // basic navbar
  // styles
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Image
        src="/images/logo.svg"
        alt="Picture of the author"
        width={159}
        height={25.22}
      />
      <IconButton
        edge="start"
        className={classes.cartIcon}
        color="inherit"
        aria-label="menu"
        // onClick={props.onMenuClick}
      >
        <Image
          src="/images/shopping-cart.svg"
          alt="Picture of the author"
          width={35}
          height={35}
        />
      </IconButton>
    </div>
  );
};
// styles
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      //   flexGrow: 1,
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      padding: '10px 0px',
      borderBottom: '4px solid #E4E4E4',
    },
    cartIcon: {
      float: 'left',
    },
  })
);
export default AppNavBarComponent;
