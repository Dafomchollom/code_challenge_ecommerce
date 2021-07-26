import React from 'react';
import Image from 'next/image';
import { makeStyles, createStyles, Grid } from '@material-ui/core';
import AppRecommendationComponent from './AppRecommendationComponent';
import { ProductInterface } from '../utils/interfaces';
import Store from '../store/store';
import { populateCartStore } from '../store/cartReducer';
import { productExist } from '../utils/products';
interface AppFeatureInterface {
  productObj: ProductInterface | undefined;
}
const AppFeatureProductComponent: React.FC<AppFeatureInterface> = ({
  productObj,
}) => {
  // Styles
  const classes = useStyles();
  // add to cart function
  const addToCartHandler = (item: ProductInterface) => {
    console.log(item, '::: item ::::');
    if (item && !productExist(item.id)) {
      const dispatch = Store.dispatch;
      dispatch(populateCartStore(item));
    } else {
      alert('product already exists');
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.headerWrapper}>
        <h2 className={classes.headerTitle}>{productObj?.name}</h2>
      </div>
      <div className={classes.productBodyWrapper}>
        <div className={classes.imageWrapper}>
          {productObj?.image && (
            <Image
              src={productObj?.image?.src}
              alt="Picture of the author"
              layout="fill"
              objectFit="cover"
              // width="100%"
              // height={25.22}
            />
          )}
          <span className={classes.badge}>Photo of the day</span>
        </div>
        <button
          className={classes.addToCartBtn}
          onClick={() => addToCartHandler(productObj as ProductInterface)}
        >
          ADD TO CART
        </button>
        <div className={classes.discriptionWrapper}>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid sm={12} md={6} item>
              <h3 className="bold_text">About the {productObj?.name}</h3>
              <h4 className={classes.category}>{productObj?.category}</h4>
              <p className={classes.discription}>
                {/* So how did the classical Latin become so incoherent? According
                to McClintock, a 15th century typesetter likely scrambled part
                of Cicero's De Finibus in order to provide placeholder text to
                mockup various fonts for a type specimen book.So how did the
                classical Latin become so incoherent? According to McClintock, a
                15th century typesetter likely scrambled part of Cicero's De
                Finibus in order to provide placeholder text to mockup various
                fonts for a type specimen book.So how did the classical Latin
                become so incoherent? According to McClintock. */}
                {productObj?.details?.description}
              </p>
            </Grid>
            <Grid sm={12} md={5} item style={{ display: 'flex' }}>
              {/* <Grid container spacing={2} justifyContent="space-between"></Grid> */}
              <AppRecommendationComponent details={productObj?.details} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
// styles
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '3rem 0px',
      position: 'relative',
      borderBottom: '4px solid #e4e4e4',
    },
    headerWrapper: {},
    headerTitle: {
      fontWeight: 'bold',
      fontSize: '32px',
      lineHeight: '35px',
    },
    addToCartBtn: {
      fontSize: '20px',
      padding: '10px 30px',
      border: 'none',
      background: '#000000',
      color: '#fff',
      position: 'absolute',
      top: '6.5%',
      right: '0',
      transition: 'all 0.5s',
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        position: 'revert',
        width: '100%',
        marginTop: '2rem',
      },
      //   width: '100%',
      //   maxWidth: '257px',
      //   height: '47px',
    },
    productBodyWrapper: {},
    discriptionWrapper: {},
    discriptionTitle: {},
    discription: {
      fontSize: '18px',
      color: '#656565',
      lineHeight: '27px',
      wordSpacing: '3px',
    },
    category: {
      color: '#656565',
      fontWeight: 'bold',
      fontSize: '22px',
      lineHeight: '24px',
    },
    imageWrapper: {
      position: 'relative',
      maxHeight: '553px',
      height: '455px',
    },
    badge: {
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      zIndex: 1,
      padding: '1.2rem 3.5rem',
      background: '#fff',
      fontWeight: 'bold',
      fontSize: '20px',
    },
  })
);
export default AppFeatureProductComponent;
