import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = " https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargerRow }) => {
  const [movies, setMovies] = useState([]);
  const [trackUrl, setTrackUrl] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
    };

    fetchMovies();
  }, [fetchUrl]);

  //Youtube options
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trackUrl) {
      setTrackUrl("");
    } else {
      movieTrailer(null, { tmdbId: movie.id })
        .then((url) => {
          console.log("url is " + url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("urlParamsn" + urlParams);
          setTrackUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }

    // console.log(movie?.name);
    // movieTrailer(movie?.name || "", { id: true, multi: true })
    //   .then((url) => {
    //     console.log(url);
    //     // https://www.youtube.com/watch?v=XtMThy8QKqU&banana=5
    //     const urlParams = new URLSearchParams(new URL(url).search);
    //     setTrackUrl(urlParams.get(" v ")); //=> https://www.youtube.com/watch?v=...
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      {/* title */}
      <h1>{title}</h1>
      {/* container -> posters */}
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id}
              className={`row__poster ${isLargerRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargerRow ? movie?.poster_path : movie?.backdrop_path
              } `}
              alt={movie.title}
            />
          );
        })}
      </div>
      {trackUrl && <YouTube videoId={trackUrl} opts={opts} />}
    </div>
  );
};

export default Row;
