import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import requests from "../utils/requests";
import Row from "../Components/Row/Row";

function Movies() {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const resPopular = await axios.get(requests.fetchPopularMovies);
      setPopular(resPopular.data.results);
      const resUpcoming = await axios.get(requests.fetchUpcomingMovies);
      setUpcoming(resUpcoming.data.results);
      const resNowPlaying = await axios.get(requests.fetchNowPlayingMovies);
      setNowPlaying(resNowPlaying.data.results);
    }
    fetchMovies();
  }, []);

  return (
    <div style={{ color: "#fff", padding: "3rem" }}>
      <h1>Movies</h1>
      <Row
        title="Popular Movies"
        movies={popular}
        isPoster={true}
        onPlayTrailer={() => {}}
      />
      <Row
        title="Upcoming Movies"
        movies={upcoming}
        isPoster={true}
        onPlayTrailer={() => {}}
      />
      <Row
        title="Now Playing"
        movies={nowPlaying}
        isPoster={true}
        onPlayTrailer={() => {}}
      />
    </div>
  );
}

export default Movies;
