import React from 'react';
import Image from 'next/image';
import {
  IconButton,
  makeStyles,
  createStyles,
  Grid,
  Badge,
} from '@material-ui/core';
import Store from '../store/store';
import { ProductInterface } from '../utils/interfaces';
import { clearStore, removeItem } from '../store/cartReducer';

interface AppNavBarInterface {}

const AppNavBarComponent: React.FC<AppNavBarInterface> = ({}) => {
  // basic navbar
  // styles
  const classes = useStyles();
  // cart state
  const [cartState, setCartState] = React.useState<Array<ProductInterface>>([]);
  // cart toggle state
  const [isActive, setIsActive] = React.useState<Boolean>(false);
  // cart store
  Store.subscribe(() => {
    const { cart } = Store.getState().cart;
    setCartState(cart);
    if (cart.length) setIsActive(true);
  });
  // clear store handler
  const clearStorehandler = () => {
    Store.dispatch(clearStore());
    setIsActive(false);
  };
  // remove item from cart
  const removeItemhandler = (id: number) => {
    Store.dispatch(removeItem(id));
  };

  React.useEffect(() => {
    const { cart } = Store.getState().cart;
    setCartState(cart);
  }, []);
  return (
    <div className={classes.root}>
      <Image
        src="/images/logo.svg"
        alt="Picture of the author"
        width={159}
        height={25.22}
      />
      <div>
        <IconButton
          edge="start"
          className={classes.cartIcon}
          color="inherit"
          aria-label="menu"
          onClick={() => setIsActive(!isActive)}
        >
          <Image
            src="/images/shopping-cart.svg"
            alt="Picture of the author"
            width={35}
            height={35}
          />
          <span className={classes.badge}>{cartState.length}</span>
        </IconButton>
      </div>
      <div
        className={classes.dropDownMenu}
        style={{ display: isActive ? 'inline-block' : 'none' }}
      >
        {cartState.length > 0 &&
          cartState.map((item, index) => (
            <div className={classes.dropDownItemWrapper} key={index}>
              <IconButton
                edge="start"
                className={classes.cancelIcon}
                color="inherit"
                aria-label="menu"
                onClick={() => removeItemhandler(item.id)}
              >
                <Image
                  src="/images/cancelIcon.svg"
                  width={15}
                  height={15}
                  alt=""
                />
              </IconButton>
              <div className={classes.dropDownItem}>
                <div>
                  <p className={classes.dropDownTitle}>{item.name}</p>
                  <span className={classes.dropDownPrice}>${item.price}</span>
                </div>
                <div>
                  <Image
                    src={item?.image?.src}
                    alt="Picture of the author"
                    width={95}
                    height={45}
                  />
                </div>
              </div>
            </div>
          ))}
        <div className={classes.btnWrapper}>
          <button
            className={classes.clearBtn}
            onClick={() => clearStorehandler()}
          >
            CLEAR
          </button>
        </div>
      </div>
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
      position: 'relative',
    },
    cartIcon: {
      float: 'left',
    },
    dropDownMenu: {
      position: 'absolute',
      right: '0',
      top: '100%',
      width: '100%',
      maxWidth: '300px',
      // height: 'auto',
      background: '#fff',
      padding: '10px 10px',
      // borderTop: '4px solid #E4E4E4',
      zIndex: 1,
      border: '3px solid #E4E4E4',
    },
    dropDownItemWrapper: {
      width: '100%',
      position: 'relative',
    },
    dropDownItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '25px 0px 10px',
    },
    dropDownTitle: {
      fontSize: '15px',
      lineHeight: '22px',
      fontWeight: 'bold',
      color: '#000000',
      margin: '0px 0px 5px',
    },
    dropDownPrice: {
      color: '#656565',
      fontSize: '20px',
    },
    badge: {
      fontSize: '15px',
      position: 'absolute',
      right: '0px',
      bottom: '0px',
      background: '#282828',
      color: '#fff',
      padding: '1px 5px',
    },
    btnWrapper: {
      borderTop: '1px solid #C2C2C2',
      padding: '10px 0px 0px',
    },
    clearBtn: {
      background: '#FFFFFF',
      border: '2px solid #000000',
      width: '100%',
      fontSize: '15px',
      padding: '5px',
      cursor: 'pointer',
    },
    cancelIcon: {
      position: 'absolute',
      top: '0',
      right: '0',
      padding: '0px 0px 10px',
    },
  })
);
export default AppNavBarComponent;
