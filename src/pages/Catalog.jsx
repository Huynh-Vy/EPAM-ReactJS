import { category as cate } from 'api/tmdbApi';
import MovieGrid from 'components/Movie/components/MovieGrid/MovieGrid';
import PageHeader from 'components/PageHeader/PageHeader';
import React from 'react';
import { useParams } from 'react-router-dom';

Catalog.propTypes = {};

function Catalog(props) {
  const { category } = useParams();

  console.log(category);
  return (
    <>
      <PageHeader>
        {category === cate.movie && 'Movies'}
        {category === cate.tv && 'TV Serries'}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
}

export default Catalog;
