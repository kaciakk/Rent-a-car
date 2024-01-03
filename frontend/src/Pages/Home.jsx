import React from 'react';
import ChooseDates from '../Components/ChooseDates/ChooseDates';
import BestDeals from '../Components/BestDeals/BestDeals';

export default function Home() {
  return (
    <div>
      <ChooseDates />
      <BestDeals />
    </div>
  );
}
