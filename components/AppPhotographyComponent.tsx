import React, { ChangeEvent } from 'react';
import { IconButton, makeStyles, createStyles, Grid } from '@material-ui/core';
import AppProductCardComponent from './AppProductCardComponent';
import Image from 'next/image';
import { ProductInterface, Categories, PriceRange } from '../utils/interfaces';
import AppFilterComponent from '../components/AppFilterComponent';
interface AppPhotographyInterface {
  products: ProductInterface[];
  categories: Categories[];
  priceRange: PriceRange[];
}
const AppPhotographyComponent: React.FC<AppPhotographyInterface> = ({
  products,
  categories,
  priceRange,
}) => {
  // styles
  const classes = useStyles();
  // sort state
  const [sortString, setSortString] = React.useState<string>('none');
  // sort state
  const [mutatProductsList, setMutatProductsList] = React.useState<
    Array<ProductInterface>
  >([]);
  //sort array function
  const sortProducts = (data: string) => {
    if (data === 'price') {
      const data = mutatProductsList.slice(0).sort((a, b) => a.price - b.price);
      console.log(data, ':::: sorted by price :::');
      setMutatProductsList(data);
    } else if ((data = 'alpha')) {
      const data = mutatProductsList.slice(0).sort((a, b) => {
        if (b.name > a.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
      });
      setMutatProductsList(data);
    } else {
      setMutatProductsList(products);
    }
  };
  // sort product function
  const sortProductsHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sortProducts(e.target.value);
    setSortString(e.target.value);
  };
  React.useEffect(() => {
    setMutatProductsList(products);
    // sortProducts(sortString);
  }, [products]);
  return (
    <div className={classes.root}>
      <div className={classes.headerWrapper}>
        <h3 className={classes.header}>
          Photography /
          <span className={classes.headerLight}> Premium Photos</span>
        </h3>
        <div className={classes.filterWrapper}>
          <IconButton
            edge="start"
            className={classes.sortIcon}
            color="inherit"
            aria-label="menu"
          >
            <Image
              src="/images/sortIcon.svg"
              alt="Picture of the author"
              width={20}
              height={20}
            />
          </IconButton>
          <span>Sort By</span>
          <select
            name=""
            className={classes.selectInput}
            onChange={sortProductsHandler}
            value={sortString}
          >
            <option value="none">none</option>
            <option value="name">Alphabetically</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      <div className={classes.bodyWrapper}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item sm={12} md={4}>
            <AppFilterComponent
              categories={categories}
              priceRange={priceRange}
            />
          </Grid>
          <Grid item sm={12} md={8}>
            <Grid container>
              {mutatProductsList.map((product, index) => (
                <React.Fragment key={index}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    style={{ margin: '0px 0px 4rem' }}
                  >
                    <div className={classes.productCardWrapper}>
                      <AppProductCardComponent product={product} />
                    </div>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '2rem 0rem',
    },
    headerWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    header: {
      fontSize: '32px',
      color: '#000000',
      lineHeight: '33px',
      margin: 0,
    },
    headerLight: {
      color: '#9B9B9B',
    },
    filterWrapper: {
      fontSize: '22px',
      lineHeight: '24px',
      color: '#9B9B9B',
    },
    sortIcon: {
      width: '50px',
      height: '50px',
    },
    selectInput: {
      border: 'none',
      outline: 'none',
      width: 'auto',
      padding: '5px 0px',
      fontSize: '22px',
      lineHeight: '24px',
    },
    options: {
      padding: '15px 0px',
    },
    bodyWrapper: {
      margin: '3rem 0rem',
    },
    productCardWrapper: {
      position: 'relative',
      width: '100%',
      //   maxWidth: '281.72px',
      height: '100%',
      minHeight: '390.67px',
      padding: '0rem 1rem 2rem !important',
      //   marginBottom: '1rem',
    },
  })
);
export default AppPhotographyComponent;
