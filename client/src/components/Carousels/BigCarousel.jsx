import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getPlatforms } from '../../redux/actions'
import { PlatformCard } from "./PlatformCard.jsx/PlatformCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export default function BigCarousel() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlatforms())
  }, [dispatch])

  let platforms = useSelector(state => state.platforms)


  const renderSlides = () =>
    platforms?.map(ptf => (
      <PlatformCard key={ptf.id} name={ptf.name} image={ptf.logo}/>
    ));

  return (
    <div>
      <Slider
        dots={false}
        slidesToShow={4}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={2000}
      > {renderSlides()}
      </Slider>
    </div>
  );
}
