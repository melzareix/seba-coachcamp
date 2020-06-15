import React from 'react';
import { useSpring, animated } from 'react-spring';
import AppHeader from '../common/header';
import HomeHero from './homeHero';
import HomeSearch from './homeSearch';
import HomeCategories from './homeCategories';
import HomeWorkshops from './homeWorkshops';
import AppFooter from '../common/footer';

export default function Home() {
  const homeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });
  return (
    <>
      <AppHeader />
      <HomeHero />
      <HomeSearch />
      <animated.div style={homeAnimation}>
        <HomeCategories />
        <HomeWorkshops />
      </animated.div>
      <AppFooter />
    </>
  );
}
