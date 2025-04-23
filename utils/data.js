import data from '../data/movies.json';

export const getAllMovies = () => data.movies;
export const getMovieById = (id) => data.movies.find((m) => m.id === id);
export const getAllGenres = () => data.genres;
export const getAllDirectors = () => data.directors;
export const getDirectorById = (id) => data.directors.find(d => d.id === id);
