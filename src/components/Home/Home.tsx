import React from "react";
import Input from "../Input/Input";
import { IMovie } from "../../App";
import MovieCard from "../MovieCard";

import "./Home.css";

interface IProps {
  movies: IMovie[] | null;
  pages: number;
  currentPage: number | null;
  loading: boolean;
  findMovie: (value: string) => void;
}

const Home: React.FC<IProps> = ({ movies, pages, currentPage, loading, findMovie }) => {

  return (
    <div className="container mt-5">
      <h1 data-testid="home_title" className="text-center">Find movie</h1>
      <Input findMovie={findMovie} />
      <div className="row m-0 justify-content-between">
        {movies &&
          movies.map((movie: IMovie) => (
            <MovieCard
              title={movie.Title}
              imageUrl={movie.Poster}
              year={movie.Year}
              imdbID={movie.imdbID}
            />
          ))}
          {loading && <h1>Loading more movies...</h1>}
      </div>
    </div>
  );
};

export default Home;
