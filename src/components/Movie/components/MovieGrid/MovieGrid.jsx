import tmdbApi, { category } from 'api/tmdbApi';
import { OutlineButton } from 'components/Button/Button';
import Filter from 'components/Filter/Filter';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import fetchMovies from '../../movieSlice';
import './MovieGrid.scss';

function MovieGrid(props) {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const getGenreList = async () => {
      let response = null;
      const params = {};
      
      if (props.category === 'movie') {
        response = await tmdbApi.getMovieGenre({ params });
      } else if (props.category === 'tv') {
        response = await tmdbApi.getTvGenre({ params });
      }
      
      setGenreList(response.genres);
    }
    getGenreList();
    return () => {
      setGenreList([]);
    };
    
  },[props.category])

  
  const [params, setParams] = useState({
    with_genres: '',
  });
  
  const handleClickGenre = (genre) => {
    setParams((prevParams) => ({
      ...prevParams,
      with_genres: genre.id,
    }))
  }


  // const movieList = useSelector((state) => state.movie);

  // useEffect(() => {
  //   const action = fetchMovies();
  //   dispatch(action);
  // },[params])

  
  useEffect(() => {
    const getList = async () => {
      let response = null;
      
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMovies({ params });
          break;
        default:
          response = await tmdbApi.getTvs({ params });
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
    return () => {
      setItems([]); 
    };
  }, [props.category, params]);

  const handleLoadMore = async () => {
    let response = null;

    const params = {
      page: page + 1,
    };
    switch (props.category) {
      case category.movie:
        response = await tmdbApi.getMovies({ params });
        break;
      default:
        response = await tmdbApi.getTvs({ params });
      
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  

  return (
    <>
      <Filter genreList={genreList} onGenreClick={handleClickGenre}/>
      <div className="movie-grid">
        {items && !!items.length && items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={handleLoadMore}>
            Load More
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
}

MovieGrid.propTypes = {
  category: PropTypes.string.isRequired,
};

export default MovieGrid;
