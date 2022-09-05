import tmdbApi, { category, movieType, tvType } from 'api/tmdbApi';
import { OutlineButton } from 'components/Button/Button';
import Filter from 'components/Filter/Filter';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.scss';

function MovieGrid(props) {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  
  const [genreList, setGenreList] = useState([]);

  const { keyword } = useParams();

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
    with_genres: [],
    query: '',
  });
  
  const handleClickGenre = (genre) => {
    setParams({ 
      ...params,
      with_genres: genre.id 
    });
  }

  
  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        setParams({
          ...params,
          query: keyword
        })
        response = await tmdbApi.search(props.category, { params });
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
    return () => {
      setItems([]); 
    };
  }, [props.category, params, keyword]);

  const handleLoadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMovieList(movieType.upcoming, { params });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      setParams({
        ...params,
        page: page + 1,
        query: keyword,
      });
      response = await tmdbApi.search(props.category, { params });
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
