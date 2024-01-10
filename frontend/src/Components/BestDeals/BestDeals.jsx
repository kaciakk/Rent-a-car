import React from 'react';
import './BestDeals.css';
import AnimatedGif from '../AnimatedGif';

export default function BestDeals() {
  return (
    <div>
    <div className='car-gif'>
      <AnimatedGif src="https://usagif.com/wp-content/uploads/gifs/car-driving-43.gif" alt="animated gif" />
    </div>
    <div className='car-bestdeal-container'>
  <h1>BestDeals</h1>
  </div>
  </div>
  );
}
