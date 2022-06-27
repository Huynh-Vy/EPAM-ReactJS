import { category, movieType, tvType } from 'api/tmdbApi';
import HeroSlide from 'components/HeroSlide/HeroSlide';
import MovieList from 'components/Movie/components/MoveList/MovieList';
import React from 'react';

Home.propTypes = {};

function Home(props) {
  return (
    <div className="hero-slide">
      <HeroSlide />
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending Movies</h2>
        </div>
        <MovieList category={category.movie} type={movieType.popular} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Top Rated Movies</h2>
        </div>
        <MovieList category={category.movie} type={movieType.top_rated} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending TV</h2>
        </div>
        <MovieList category={category.tv} type={tvType.popular} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Top Rated TV</h2>
        </div>
        <MovieList category={category.tv} type={tvType.top_rated} />
      </div>
    </div>
  );
}

export default Home;
