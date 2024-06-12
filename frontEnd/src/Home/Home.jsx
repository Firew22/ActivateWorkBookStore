import React from 'react';
import Banner from '../components/Banner';
import FavoriteBooks from './BestSellerBooks';
import FavBooks from './FavBooks';
import PromoBanner from './PromoBanner';
import OtherBooks from './OtherBooks';


const Home = () => {
  return (
    <div >
      <Banner />
      <FavoriteBooks />
      <FavBooks />
      <PromoBanner />
      <OtherBooks />
    </div>
   
  );
};

export default Home;