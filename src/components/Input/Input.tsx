import React from "react";

import './Input.css';

const Input: React.FC<{ findMovie: (value: string) => void }> = ({ findMovie }) => {
    const [value, setValue] = React.useState("");

  return (
    <div>
      <input data-testid="movie_search" autoFocus type="text" value={value} placeholder="Title of movie..." className="form-control search" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
      <button data-testid="submit" type="button" className="btn btn-dark btn-block mt-3 mb-3" onClick={() => findMovie(value)} disabled={!value}>
        Find movie
      </button>
    </div>
  );
};

export default Input;
