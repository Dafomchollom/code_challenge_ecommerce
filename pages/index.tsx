import React from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@material-ui/core';

import { ProductInterface, Categories, PriceRange } from '../utils/interfaces';
import { getProducts, getCategories } from '../utils/products';
import Store from '../store/store';
const AppNavBarComponent = dynamic(
  () => import('../components/AppNavBarComponent'),
  { ssr: false }
);
const AppFeatureProductComponent = dynamic(
  () => import('../components/AppFeatureProductComponent'),
  { ssr: false }
);
const AppPhotographyComponent = dynamic(
  () => import('../components/AppPhotographyComponent'),
  { ssr: false }
);
export default function Home() {
  // products and category states
  const [products, setProducts] = React.useState<Array<ProductInterface>>([]);

  const [featuredProducts, setFeaturedProducts] =
    React.useState<ProductInterface>();

  const [categories, setcategories] = React.useState<Array<Categories>>([]);

  const [priceRange, setPriceRange] = React.useState<Array<PriceRange>>([]);

  // products handler to set products and featured products
  const productHandler = (prod: ProductInterface[]) => {
    if (prod) {
      const featdProduct = prod?.find((item) => item.featured);
      setFeaturedProducts(featdProduct);
      setProducts(prod);
    }
  };

  React.useEffect(() => {
    getProducts().then((data) => {
      productHandler(data?.products);
      setPriceRange(data?.priceRange);
    });
    getCategories().then((data) => setcategories(data));
  }, []);

  Store.subscribe(() => {
    const { products } = Store.getState().productsList;
    productHandler(products.products);
  });
  return (
    <Container maxWidth="lg">
      <AppNavBarComponent />
      <AppFeatureProductComponent productObj={featuredProducts} />
      <AppPhotographyComponent
        products={products}
        categories={categories}
        priceRange={priceRange}
      />
    </Container>
  );
}
