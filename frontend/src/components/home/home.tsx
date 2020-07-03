import React from 'react';
import { animated, useSpring } from 'react-spring';
import HomeCategories from './homeCategories';
import HomeHero from './homeHero';
import HomeSearch from './homeSearch';
import HomeWorkshops from './homeWorkshops';

export default function Home() {
  const homeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });
  return (
    <>
      <HomeHero />
      <HomeSearch />
      <animated.div style={homeAnimation}>
        <HomeCategories />
        <HomeWorkshops />
      </animated.div>
    </>
  );
}
