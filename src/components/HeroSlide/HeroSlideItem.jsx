import apiConfig from 'api/apiConfig';
import tmdbApi, { category } from 'api/tmdbApi';
import Button, { OutlineButton } from 'components/Button/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';


HeroSlideItem.propTypes = {
  item: PropTypes.object,
};

HeroSlideItem.defaultProps = {
  item: {},
};

function HeroSlideItem(props) {
  const { item } = props;
  const history = useHistory();

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
      modal
        .querySelector('.modal__content > iframe')
        .setAttribute('src', videoSrc);
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No Trailer';
    }

    modal.classList.toggle('active');
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push(`/movie/${item.id}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
        </div>
      </div>
    </div>
  );
}

export default HeroSlideItem;
