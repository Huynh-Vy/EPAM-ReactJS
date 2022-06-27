import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import apiConfig from 'api/apiConfig';
import { category } from 'api/tmdbApi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.scss';

const MovieCard = (props) => {
  const { item} = props;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const [clickFavoriteIcon, setClickFavoriteIcon] = useState(false);
  const [addItem, setAddItem] = useState(true);

  const link = '/' + category[props.category] + '/' + item.id;

  let colorVote = '';

  if (Number(item["vote_average"]) >= 8) {
    colorVote = '#33cc33';
  } else if (Number(item["vote_average"]) >= 7) {
    colorVote = 'orange';
  } else {
    colorVote = 'yellow';
  }



  const handleClickFavoriteIcon = () => {
    clickFavoriteIcon ? setClickFavoriteIcon(false) : setClickFavoriteIcon(true);
  }

  const handleAddItem = () => {
    addItem ? setAddItem(false) : setAddItem(true);
  }

  return (
    <>
    
      <div className="poster-container">
      <Link to={link}>
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        </div>
      </Link>

        <h3>{item.title || item.name}</h3>
        <h3>
          Vote: <span className="vote-average" style={{color: `${colorVote}`}}>{item["vote_average"]}</span>
        </h3>

        <div>
          <span>  
            {
              !clickFavoriteIcon &&  <FavoriteBorderIcon onClick={handleClickFavoriteIcon}/>
            }
          </span>

          <span>
            {
              clickFavoriteIcon &&  <FavoriteIcon onClick={handleClickFavoriteIcon}/>
            }
          </span>
        </div>
      </div>
    </>
  );
};

MovieCard.propTypes = {
  item: PropTypes.object,
};

export default MovieCard;
