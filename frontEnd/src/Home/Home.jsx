import React from 'react';
import Banner from '../components/Banner';
import FavoriteBooks from './BestSellerBooks';
import FavBooks from './FavBooks';


const Home = () => {
  return (
    <div >
      <Banner />
      <FavoriteBooks />
      <FavBooks />
    </div>
   
  );
};

export default Home;