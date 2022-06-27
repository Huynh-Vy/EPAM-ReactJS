import PropTypes from 'prop-types';
import React from 'react';
import './Filter.scss';

Filter.propTypes = {
    genreList: PropTypes.array,
    onClick: PropTypes.func,
};

function Filter(props) {
    const { onGenreClick, genreList } = props;

    const handleClickGenre = (genre) => {
        if (!onGenreClick) return;

        onGenreClick(genre);
    }

    return (
        <>
            <ul className="tags">
                {genreList && genreList.map((genre) => (
                    <li 
                    key={genre.id} 
                    onClick={() => {handleClickGenre(genre)}} 
                    className="tag"
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>

        </>
    );
}

export default Filter;