import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import apiConfig from 'api/apiConfig';
import { category } from 'api/tmdbApi';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MovieCard.scss';

const MovieCard = (props) => {
  const { item} = props;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  const link = '/' + category[props.category] + '/' + item.id;

  let colorVote = '';

  if (Number(item["vote_average"]) >= 8) {
    colorVote = '#33cc33';
  } else if (Number(item["vote_average"]) >= 7) {
    colorVote = 'orange';
  } else {
    colorVote = 'yellow';
  }

  return (
    <>
      <div className="poster-container">
      <Link to={link}>
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <PlayArrowIcon fontSize="large"/>
        </Button>
        </div>
      </Link>

        <h3>{item.title || item.name}</h3>
        <h3>
          Vote: <span className="vote-average" style={{color: `${colorVote}`}}>{item["vote_average"]}</span>
        </h3>
      </div>
    </>
  );
};

MovieCard.propTypes = {
  item: PropTypes.object,
};

export default MovieCard;
