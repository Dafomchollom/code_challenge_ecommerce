import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
const AppNavBarComponent = dynamic(
  () => import('../components/AppNavBarComponent'),
  {
    ssr: false,
  }
);
const AppFeatureProductComponent = dynamic(
  () => import('../components/AppFeatureProductComponent'),
  {
    ssr: false,
  }
);
export default function Home() {
  const data = {
    name: 'Samurai King Restling',
    category: 'landmarks',
    price: 101,
    currency: 'USD',
    image: {
      src: '',
      alt: '',
    },
    bestseller: false,
    featured: true,
    details: {
      dimmentions: {
        width: 1020,
        height: 1020,
      },
      size: 15000,
      description:
        'So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely',
      recommendations: [
        {
          src: '',
          alt: '',
        },
        {
          src: '',
          alt: '',
        },
        {
          src: '',
          alt: '',
        },
      ],
    },
  };
  return (
    <div className="page_wrapper">
      <AppNavBarComponent />
      <AppFeatureProductComponent productObj={data} />
    </div>
  );
}
