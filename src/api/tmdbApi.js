import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv',
};

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
};

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
};

const tmdbApi = {
    getMovieList: (type, params) => {
        const url = `movie/${movieType[type]}`;
        return axiosClient.get(url, params);
    },

    getTvList: (type, params) => {
        const url = `tv/${tvType[type]}`;
        return axiosClient.get(url, params);
    },

    getMovies: (params) => {
        const url = 'discover/movie';
        return axiosClient.get(url, params);
    },

    getTvs: (params) => {
        const url = 'discover/tv';
        return axiosClient.get(url, params);
    },

    getMovieGenre : (params) => {
        const url = `genre/movie/list`;
        return axiosClient.get(url, params);
    },

    getTvGenre : (params) => {
        const url = `genre/tv/list`;
        return axiosClient.get(url, params);
    },

    getVideos: (cate, id) => {
        const url = `${category[cate]}/${id}/videos`;
        return axiosClient.get(url, { params: {} });
    },

    getDetail: (cate, id, params) => {
        const url = `${category[cate]}/${id}`;
        return axiosClient.get(url, params);
    },
    getCredits: (cate, id) => {
        const url = `${category[cate]}/${id}/credits`;
        return axiosClient.get(url, { params: {} });
    },
}

export default tmdbApi;