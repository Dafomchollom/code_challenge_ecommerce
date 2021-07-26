import React from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@material-ui/core';
import { ProductInterface, Images } from '../utils/interfaces';
import Store from '../store/store';
import { populateCartStore } from '../store/cartReducer';
import { productExist } from '../utils/products';
interface AppProductCardComponent {
  product?: ProductInterface;
  img?: Images;
}
const AppProductCardComponent: React.FC<AppProductCardComponent> = ({
  product,
  img,
}) => {
  // styles
  const classes = useStyles();
  // isHover state
  const [isHover, setIsHover] = React.useState<boolean>(false);
  // add to cart function
  const addToCartHandler = (item: ProductInterface) => {
    if (item && !productExist(item.id)) {
      const dispatch = Store.dispatch;
      dispatch(populateCartStore(item));
    } else {
      alert('product already exists');
    }
  };
  return (
    <div className={classes.root}>
      <div
        className={classes.cardWrapper}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image
          src={product ? product?.image?.src : img?.src}
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
          className={classes.image}
        />
        {product?.bestseller && (
          <span className={classes.bestSeller}>Best Seller</span>
        )}
        <button
          className={`${classes.cartBtn} ${isHover && classes.isHover}`}
          onClick={() => addToCartHandler(product)}
        >
          ADD TO CART
        </button>
      </div>
      {!img && (
        <div className={classes.detailsWrapper}>
          <h3 className={classes.category}>{product?.category}</h3>
          <h3 className={classes.productName}>{product?.name}</h3>
          <span className={classes.price}>${product?.price}</span>
        </div>
      )}
    </div>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
    },
    category: {
      color: '#656565',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '24px',
      margin: 0,
    },
    productName: {
      fontWeight: 'bold',
      fontSize: '23px',
      lineHeight: '37px',
      margin: 0,
      color: '#000000',
    },
    cardWrapper: {
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
    detailsWrapper: {},
    price: {
      fontSize: '19px',
      lineHeight: '32px',
      color: '#656565',
    },
    bestSeller: {
      fontSize: '15px',
      lineHeight: '22px',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '5px 15px',
      background: '#fff',
      color: '#000000',
    },
  })
);
export default AppProductCardComponent;
