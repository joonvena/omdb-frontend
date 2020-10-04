import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard: React.FC<{
  title: string;
  imageUrl: string;
  year: string;
  imdbID: string;
}> = ({ title, imageUrl, year, imdbID }) => {
  return (
    <div
      className="col-12 col-sm-12 col-m-4 col-lg-4 col-xl-4 p-0 card"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(75, 108, 183, 1), rgba(0, 0, 0, 0.1)), url('${imageUrl}')`,
      }}
    >
      <Link to={`/movies/${imdbID}`} style={{ height: "100%" }}>
        <div className="d-flex flex-column m-2 h-100">
          <div className="d-flex flex-row">
            <h5 style={{ flexGrow: 1 }}>{title}</h5>
          </div>
          <h5>{year}</h5>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
