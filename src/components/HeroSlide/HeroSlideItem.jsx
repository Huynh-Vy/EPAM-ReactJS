import apiConfig from 'api/apiConfig';
import PropTypes from 'prop-types';
import React from 'react';

HeroSlideItem.propTypes = {
  item: PropTypes.object,
};

HeroSlideItem.defaultProps = {
  item: {},
};

function HeroSlideItem(props) {
  const { item } = props;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
        </div>
      </div>
    </div>
  );
}

export default HeroSlideItem;
