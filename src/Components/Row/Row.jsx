import React, { useRef, useState } from "react";
import "./row.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Row({ title, movies, isPoster = true }) {
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  React.useEffect(() => {
    const checkScroll = () => {
      const el = listRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    checkScroll();
    const el = listRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [movies]);

  const scroll = (dir) => {
    const el = listRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

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
    <section className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__outer">
        {canScrollLeft && (
          <button
            className="row__chevron row__chevron--left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </button>
        )}
        <div className="row__list" ref={listRef}>
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="row__item"
              onClick={() => handlePlayTrailer(movie)}
            >
              {isPoster ? (
                <img
                  className="row__poster"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                      : undefined
                  }
                  alt={movie.title || movie.name || movie.original_name}
                />
              ) : (
                <img
                  className="row__banner"
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                      : undefined
                  }
                  alt={movie.title || movie.name || movie.original_name}
                />
              )}
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            className="row__chevron row__chevron--right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </button>
        )}
        <div
          className="row__shadow row__shadow--left"
          style={{ opacity: canScrollLeft ? 1 : 0 }}
        />
        <div
          className="row__shadow row__shadow--right"
          style={{ opacity: canScrollRight ? 1 : 0 }}
        />
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
              type="button"
              className="trailer-close-button"
              onClick={(e) => {
                e.stopPropagation();
                setTrailerUrl("");
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Row;
