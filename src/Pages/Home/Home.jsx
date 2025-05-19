import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "../../Components/Hero";
import Row from "../../Components/Row";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./home.css";

function Home() {
  const [rows, setRows] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchAllRows() {
      const fetches = Object.entries(requests)
        .filter(([key]) => key !== "fetchNetflixOriginals")
        .map(async ([key, url]) => {
          const res = await axios.get(url);
          return [key, res.data.results];
        });
      const results = await Promise.all(fetches);
      const rowsObj = Object.fromEntries(results);
      setRows(rowsObj);
    }
    fetchAllRows();
  }, []);

  const handlePlayTrailer = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      if (!movie) {
        toast.warn("Movie data is not available to play trailer.");
        return;
      }
      try {
        const url = await movieTrailer(
          movie?.title || movie?.name || movie?.original_name || ""
        );
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        } else {
          toast.error(
            `No trailer found for: ${
              movie?.title ||
              movie?.name ||
              movie?.original_name ||
              "Unknown Movie"
            }`
          );
        }
      } catch (error) {
        toast.error("Error trying to fetch trailer.");
      }
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <Hero onPlayTrailer={handlePlayTrailer} />
      <div className="home__rows">
        {Object.entries(requests).map(([key, url]) => {
          if (key === "fetchNetflixOriginals") return null;

          const title = key
            .replace("fetch", "")
            .replace(/([A-Z])/g, " $1")
            .trim();
          return (
            <Row
              key={key}
              title={title}
              movies={rows[key] || []}
              onPlayTrailer={handlePlayTrailer}
              isPoster={true}
            />
          );
        })}
      </div>
      {trailerUrl && (
        <div className="trailer-overlay">
          <div className="trailer-container">
            <YouTube
              videoId={trailerUrl}
              opts={opts}
              className="youtube-player"
            />
            <button
              className="trailer-close-button"
              onClick={() => setTrailerUrl("")}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
