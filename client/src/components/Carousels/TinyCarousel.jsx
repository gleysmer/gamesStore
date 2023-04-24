import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import GameCard from './GameCard/GameCard'
import { getProducts } from '../../redux/actions'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

export default function TinyCarousel({ slides, speed }) {
  const dispatch = useDispatch()
  let newPopulars = useSelector(state => state.newPopulars)
  let page = useSelector(state => state.page)

  useEffect(() => {
    dispatch(getProducts(null, page))
  }, [newPopulars, dispatch])


  let games = useSelector(state => state.games)
  console.log('----STATE GAMES----', games);

  const renderSlides = () =>
    games.map(game => (
      <GameCard key={game.id} id={game.id} name={game.name} image={game.image} />
    ));

  return (
    <div>
      <Slider
        dots={false}
        slidesToShow={slides}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={speed || 3000}
      >{renderSlides()}
      </Slider>
    </div>
  );
}
