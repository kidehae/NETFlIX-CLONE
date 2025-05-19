import React, { useEffect, useState } from "react";
import "./hero.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Row from "../Row";

function Hero({ onPlayTrailer }) {
  const [movie, setMovie] = useState(null);
  const [originals, setOriginals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const trendingRequest = await axios.get(requests.fetchTrending);
      const trendingResults = trendingRequest.data.results;
      if (trendingResults && trendingResults.length > 0) {
        setMovie(
          trendingResults[Math.floor(Math.random() * trendingResults.length)]
        );
      }
      const originalsRequest = await axios.get(requests.fetchNetflixOriginals);
      setOriginals(originalsRequest.data.results);
    }
    fetchData();
  }, []);

  return (
    <>
      <section className="hero">
        <div
          className="hero__background"
          style={{
            backgroundImage: movie?.backdrop_path
              ? `linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.7) 30%, rgba(20,20,20,0) 60%), linear-gradient(to top, rgba(20,20,20,0.9) 10%, rgba(20,20,20,0.2) 60%, transparent 100%), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
              : undefined,
          }}
        ></div>
        <div className="hero__content-wrapper">
          <div className="hero__content">
            <h1 className="hero__title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="hero__description">
              {movie?.overview?.length > 150
                ? movie.overview.slice(0, 150) + "..."
                : movie?.overview}
            </p>
            <div className="hero__buttons">
              <button
                className="hero__button hero__button--play"
                onClick={() => onPlayTrailer(movie)}
              >
                ▶ Play
              </button>
              <button className="hero__button hero__button--info">
                ℹ More Info
              </button>
            </div>
          </div>
          {movie?.poster_path && (
            <img
              className="hero__poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie?.title || movie?.name || movie?.original_name}
              onClick={() => onPlayTrailer(movie)}
            />
          )}
        </div>
        {originals && originals.length > 0 && (
          <Row title="Netflix Originals" movies={originals} isPoster={false} />
        )}
      </section>
    </>
  );
}

export default Hero;
