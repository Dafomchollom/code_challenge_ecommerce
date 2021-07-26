import { firestore } from './firebase';
import {
  Categories,
  ProductInterface,
  PriceRange,
  ProductPromise,
} from './interfaces';
import Store from '../store/store';
// fetch categories function
const getCategories = async (): Promise<Array<Categories>> => {
  let result: Categories[] = [];
  await firestore
    .collection('Categories')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((item) => {
        result = [...result, item.data()] as Categories[];
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return result;
};
// fetch products function
const getProducts = async (): Promise<ProductPromise> => {
  // let result = [];
  let result: ProductInterface[] = [];
  await firestore
    .collection('Products')
    // .where('category', 'in', ['people', 'landmarks'])
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((item) => {
        result = [...result, item.data()] as ProductInterface[];
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  const priceRange = pricehandler(result);
  return { products: result, priceRange };
};

// get prices and set price range funtion
const pricehandler = (data: ProductInterface[]) => {
  const prices = data.map((item) => item.price).sort((a, b) => a - b);
  let i = 0;

  let result: PriceRange[] = [];

  prices.forEach((item, index, arr) => {
    if (index !== 0) {
      result.push({
        name: `${i === 0 ? 'Lower than' : '$' + i + ' - '} ${'$' + arr[index]}`,
        value: [i, arr[index]],
      });
      i = item;
    }
  });
  return result;
};
// check if product exists in cart
const productExist = (id: number) => {
  const { cart } = Store.getState().cart;
  const exist = cart.some((item) => item.id === id);
  return exist;
};
export { getProducts, getCategories, productExist };
