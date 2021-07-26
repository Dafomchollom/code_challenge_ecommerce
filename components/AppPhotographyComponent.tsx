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
  const [isFilter, setFilterState] = React.useState<Boolean>(true);
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
  // filter options
  const filterHandler = () => {};
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
        <IconButton
          edge="start"
          className={classes.filterIcon}
          color="inherit"
          aria-label="menu"
          onClick={() => setFilterState(true)}
        >
          <Image src="/images/filter.svg" width={30} height={30} alt="" />
        </IconButton>
        <div className={classes.sortWrapper}>
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
            <div
              className={classes.filterWrapper}
              style={{ display: isFilter ? 'inline-block' : 'none' }}
            >
              {/* <IconButton
                edge="start"
                className={classes.cancelIcon}
                color="inherit"
                aria-label="menu"
                // onClick={() => removeItemhandler(item.id)}
              >
                <Image
                  src="/images/cancelIcon.svg"
                  width={15}
                  height={15}
                  alt=""
                />
              </IconButton> */}
              <AppFilterComponent
                categories={categories}
                priceRange={priceRange}
                onCancel={() => setFilterState(false)}
              />
            </div>
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
      [theme.breakpoints.down('md')]: {
        fontSize: '18px',
      },
      margin: 0,
    },
    headerLight: {
      color: '#9B9B9B',
    },
    filterIcon: {
      padding: '0px',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    sortWrapper: {
      fontSize: '22px',
      lineHeight: '24px',
      color: '#9B9B9B',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    filterWrapper: {
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        position: 'fixed',
        background: '#fff',
        zIndex: 1,
        width: '100%',
        bottom: 0,
        padding: '15px 0px 0px',
      },
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
    cancelIcon: {
      position: 'absolute',
      right: '0px',
      top: '0px',
    },
  })
);
export default AppPhotographyComponent;
