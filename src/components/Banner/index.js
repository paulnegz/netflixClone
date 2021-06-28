import React, { useState, useEffect } from "react";
import axios from '../../axios';
import requests from "../../request";
import "./styles.css";
import Youtube from "react-youtube";


function Banner() {
  const [movie, setMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchActionMovies);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  const handlePlay = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

    // Options for react-youtube
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
      <div>
        <header
        className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backdropPosition: "center center",
        }}
        >
        {/* Background image */}
        <div className="banner_contents">
            {/* title */}
            <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
            </h1>

            {/* 2 buttons */}
            <div className="banner_buttons">
            <button className="banner_button" onClick={() => handlePlay(movie)}>Play</button>
            <button className="banner_button" >My List </button>
            </div>

            {/* description */}
            <h1 className="banner_description">{truncate(movie?.overview, 200)}</h1>
        </div>
        <div className="banner_fadeBottom" />
        </header>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>

  );
}

export default Banner;