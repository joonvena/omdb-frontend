import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import MovieDetails from './components/MovieDetails';
import Home from './components/Home/Home';
import infinityScoller from './utils/infinityScroller';

const API_KEY = process.env.REACT_APP_API_KEY || '';

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface IUserData {
  favorites: string[];
}

const App: React.FC = () => {
  const [movies, setMovies] = React.useState<IMovie[] | null>(null);
  const [pages, setPages] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<IUserData | null>(null);

  const isBottom = infinityScoller();

  const match = useRouteMatch<{ id: string }>('/movies/:id');
  const movie = match
    ? movies && movies.find((movie) => movie.imdbID === String(match.params.id))
    : null;

  React.useEffect(() => {
    if (!isBottom || !movies || currentPage === pages) return;

    nextPage(currentPage + 1);
  }, [isBottom]);

  React.useEffect(() => {
    const userData = localStorage.getItem('movie_data');
    if (!userData) {
      const data: IUserData = { favorites: [] };
      localStorage.setItem('movie_data', JSON.stringify(data));
      setUserData(data);
    } else {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleFavorite = (id: string) => {
    const te = userData;
    te?.favorites.push(id);
    setUserData(te);
    const inFavorites = userData?.favorites.filter(
      (favorite) => favorite !== id
    );
    if (inFavorites && inFavorites.length > 0) {
      console.log(userData);
    }
  };

  const findMovie = async (value: string) => {
    try {
      setLoading(true);
      setSearchTerm(value);
      const result = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`
      );
      const data = await result.json();
      setPages(Math.ceil(data.totalResults / 10));
      setCurrentPage(1);
      setMovies(data.Search);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const nextPage = async (page: number) => {
    try {
      setLoading(true);
      const result = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`
      );
      const data = await result.json();
      setCurrentPage(page);
      setMovies((movies) => [...movies, ...data.Search]);
      console.log(movies);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Switch>
        <Route path="/movies/:id">
          {movie && (
            <MovieDetails
              title={movie.Title}
              handleFavorite={handleFavorite}
              id={movie.imdbID}
            />
          )}
        </Route>
        <Route path="/">
          <Home
            findMovie={findMovie}
            movies={movies}
            pages={pages}
            currentPage={currentPage}
            loading={loading}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
