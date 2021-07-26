import React, { ChangeEvent } from 'react';
import { makeStyles, createStyles, IconButton } from '@material-ui/core';
import { Categories, PriceRange } from '../utils/interfaces';
import AppCheckBoxInput from '../components/AppCheckBoxInput';
import Image from 'next/image';
import { getProducts } from '../utils/products';
import { populateProductsStore } from '../store/productsReducers';
import Store from '../store/store';

interface AppFilterInterface {
  categories: Categories[];
  priceRange: PriceRange[];
  onCancel?: () => void;
}

const AppFilterComponent: React.FC<AppFilterInterface> = ({
  categories,
  priceRange,
  onCancel,
}) => {
  // styles
  const classes = useStyles();
  //mutated category list with flag state
  const [mutatedList, setIsMutatedList] = React.useState<Array<Categories>>([]);
  //mutated price list with flag state
  const [mutatedPriceList, setIsMutatedPriceList] = React.useState<
    Array<PriceRange>
  >([]);
  // add isChecked flag to categories array
  const arrayCategoriesMutationHandler = (arr: Categories[]) => {
    if (arr) {
      const data = arr.map((catergory) => ({ ...catergory, isChecked: false }));
      setIsMutatedList(data);
    }
  };
  // add isChecked flag to product price range array
  const arrayPriceMutationHandler = (arr: PriceRange[]) => {
    if (arr) {
      const data = arr.map((catergory) => ({ ...catergory, isChecked: false }));
      setIsMutatedPriceList(data);
    }
  };
  // handleCheckChieldElement
  const handleCheckChieldElement = (event) => {
    const data = [...mutatedList];
    data.forEach((catergory, index, arr) => {
      if (catergory.name === event.target.value) {
        arr[index] = {
          ...catergory,
          isChecked: event.target.checked,
        };
      }
    });

    setIsMutatedList(data);
  };
  // price handle click function
  const handleCheckChieldElementUnique = (event) => {
    const data = mutatedPriceList.map((catergory) =>
      catergory.name === event.target.value
        ? {
            ...catergory,
            isChecked: event.target.checked,
          }
        : {
            ...catergory,
            isChecked: false,
          }
    );
    setIsMutatedPriceList(data);
  };
  // filterFunctionhandler
  const filterFunctionHandler = () => {
    // get active categories
    const catergories = mutatedList
      .filter((item) => item.isChecked)
      .map((item) => item.name);
    // get active price range
    const priceList = mutatedPriceList
      .filter((item) => item.isChecked)
      .map((item) => item.value);
    getProducts(catergories, ...priceList).then((data) =>
      Store.dispatch(populateProductsStore(data))
    );
  };
  // clear filter
  const clearFilter = () => {
    arrayCategoriesMutationHandler(categories);
    arrayPriceMutationHandler(priceRange);
  };
  // mutate categories on mounted
  React.useEffect(() => {
    arrayCategoriesMutationHandler(categories);
    arrayPriceMutationHandler(priceRange);
  }, [categories, priceRange]);

  return (
    <div className={classes.root}>
      <IconButton
        edge="start"
        className={classes.cancelIcon}
        color="inherit"
        aria-label="menu"
        onClick={onCancel}
      >
        <Image src="/images/cancelIcon.svg" width={20} height={20} alt="" />
      </IconButton>
      <h3 className={classes.title}>Category</h3>
      <ul className={`${classes.listStyle} ${classes.onMobile}`}>
        {mutatedList?.map((item, index) => (
          <AppCheckBoxInput
            key={index}
            handleCheckChieldElement={handleCheckChieldElement}
            {...item}
          />
        ))}
      </ul>
      <h3 className={classes.title}>Price Range</h3>
      <ul className={classes.listStyle}>
        {mutatedPriceList?.map((item, index) => (
          <AppCheckBoxInput
            key={index}
            handleCheckChieldElement={handleCheckChieldElementUnique}
            {...item}
          />
        ))}
      </ul>
      <div className={classes.btnWrapper}>
        <button
          className={classes.save}
          onClick={() => filterFunctionHandler()}
        >
          Apply
        </button>
        <button className={classes.clearBtn} onClick={() => clearFilter()}>
          Cancel
        </button>
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    title: {
      fontSize: '22px',
      lineHeight: '24px',
      color: '#000000',
      margin: '0px',
    },
    checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      color: '#1D1D1D',
      fontSize: '20px',
      lineHeight: '20px',
      // display: 'flex',
      // justifyContent: 'center',
    },
    listStyle: {
      listStyle: 'none',
      padding: '0px',
    },
    onMobile: {
      [theme.breakpoints.down('sm')]: {
        borderBottom: '2px solid #C2C2C2',
      },
    },
    cancelIcon: {
      position: 'absolute',
      right: '15px',
      top: '-10px',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    clearBtn: {
      background: '#FFFFFF',
      border: '2px solid #000000',
      width: '100%',
      fontSize: '15px',
      padding: '5px',
      cursor: 'pointer',
      margin: '0px 5px',
    },
    save: {
      background: '#000000',
      border: '2px solid #000000',
      color: '#ffff',
      width: '100%',
      fontSize: '15px',
      padding: '5px',
      cursor: 'pointer',
      margin: '0px 5px',
    },
    btnWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0px 20px',
    },
  })
);
export default AppFilterComponent;
