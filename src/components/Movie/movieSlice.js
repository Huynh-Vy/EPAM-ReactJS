import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tmdbApi from 'api/tmdbApi';
import { useParams } from "react-router-dom";

const fetchMovies = createAsyncThunk(
    'movie/fetchMovies',
    async(payload) => {
        const { category } = useParams();
        let response = null;
        const params = {};
        if (category === 'movie') {
            response = await tmdbApi.getMovies({ params });
        } else if (category === 'tv') {
            response = await tmdbApi.getTvs({ params });
        }

        return response.results;
    }
)

const movieSlice = createSlice({
    name: 'genre',
    initialState : {
        movies: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [fetchMovies.pending] : (state, action) => {
            state.loading = true;
        },

        [fetchMovies.fulfilled] : (state, action) => {
            state.loading = false;
            state.genres = action.paload;
        },

        [fetchMovies.rejected] : (state, action) => {
            state.loading = false;
        },

    }
});

const { reducer } = movieSlice;
export default reducer;