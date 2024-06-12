import React from 'react';
import Banner from '../components/Banner';
import FavoriteBooks from './BestSellerBooks';
import FavBooks from './FavBooks';
import PromoBanner from './PromoBanner';


const Home = () => {
  return (
    <div >
      <Banner />
      <FavoriteBooks />
      <FavBooks />
      <PromoBanner />
    </div>
   
  );
};

export default Home;