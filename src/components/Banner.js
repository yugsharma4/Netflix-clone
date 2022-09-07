import axios from "../axios";
import React, { useEffect, useState } from "react";
import requests from "../requests";
import "./Banner.css";

const base_url = " https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        res.data.results[
          Math.floor(Math.random() * (res.data.results.length - 1))
        ]
      );
    };

    fetchMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      {/* background image */}

      <div className="banner__contents">
        {/* title */}
        <h2 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h2>
        {/* div -> 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
};

export default Banner;
